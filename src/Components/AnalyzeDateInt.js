import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Select, MenuItem } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const AnalyzeDateInt = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [portNames, setPortNames] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const lineColors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#ff0000', '#00ff00', '#0000ff', '#ff00ff', '#00ffff', '#ffff00'];
  const [error, setError] = useState('');
  const [portNamesList, setPortNamesList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    if (endDateObj <= startDateObj) {
      setError('End date must be after the start date.');
      return;
    }

    setError('');
  
    console.log('Submitting:', startDate, endDate, portNames);
    fetchData();
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handlePortNameChange = (event) => {
    setPortNames(event.target.value);
  };
  
  const fetchData = async () => {
    console.log('start date', formatDate(startDate), 'end date', formatDate(endDate));
    try {
      const response = await axios.get(
        `http://localhost:8080/api/mtd/fetchData?startDate=${formatDate(startDate)}&endDate=${formatDate(endDate)}&columnNames=${portNames}`
      );
  
      const portDataMap = {};
  
      response.data.forEach((row) => {
        const date = row.date;
        const time = row.time;
        const dateTime = new Date(`${date} ${time}`);
        const timestamp = dateTime.getTime();
        const portValues = Object.entries(row).filter(([key]) => key !== 'date' && key !== 'time');
        portValues.forEach(([port, value]) => {
          const formattedValue = parseFloat(value.replace(',', '.'));
          if (!isNaN(formattedValue)) {
            if (!portDataMap[port]) {
              portDataMap[port] = [];
            }
            portDataMap[port].push({ date: timestamp, [port]: formattedValue });
          } else {
            console.error('Error parsing value:', value, 'for port:', port);
          }
        });
      });
  
      const combinedData = [];
      Object.keys(portDataMap).forEach((port) => {
        portDataMap[port].forEach((data) => {
          const existingData = combinedData.find((item) => item.date === data.date);
          if (existingData) {
            existingData[port] = data[port];
          } else {
            combinedData.push(data);
          }
        });
      });

      combinedData.sort((a, b) => a.date - b.date);

      const formattedData = Object.keys(portDataMap).map((port) => ({
        name: port,
        data: combinedData.map((data) => ({ date: data.date, [port]: data[port] || null })),
      }));
  
      console.log('Formatted data:', formattedData);
      setGraphData(formattedData);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  
  const formatDate = (date) => {
    const formattedDate = new Date(date);
    const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0');
    const day = formattedDate.getDate().toString().padStart(2, '0');
    const year = formattedDate.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    return `${hours}:${minutes}:${seconds}`;
  };

  const fetchCommonColumnNames = (startDate, endDate) => {
    fetch(`http://localhost:8080/api/mtd/commonColumnNames?date1=${formatDate(startDate)}&date2=${formatDate(endDate)}`)
      .then((response) => response.json())
      .then((data) => {
        setPortNamesList(data);
        console.log('Common column names:', data);
      })
      .catch((error) => {
        console.error('Error fetching common column names:', error);
      });
  };

  useEffect(() => {
    if (startDate && endDate) {
      fetchCommonColumnNames(startDate, endDate);
    }
  }, [startDate, endDate]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        minHeight: '100vh',
        paddingTop: '50px',
      }}
    >
      <h2>Analyze Data</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Select Start Date:</label>
          <TextField
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            inputProps={{ max: new Date().toISOString().split('T')[0] }}
          />
        </div>
        <div>
          <label>Select End Date:</label>
          <TextField
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            inputProps={{ max: new Date().toISOString().split('T')[0] }}
          />
        </div>
        <div>
        <label>Port Names:</label>
          <Select
            multiple
            value={portNames}
            onChange={handlePortNameChange}
            inputProps={{ 'aria-label': 'Port Names' }}
          >
            {portNamesList.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </div>
        <Button type="submit">Plot</Button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
        {graphData.length > 0 && (
    <div>
      <h2>Graph</h2>
      <LineChart width={800} height={400}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          type="number"
          domain={['dataMin', 'dataMax']}
          tickFormatter={(tick) => formatDate(new Date(tick))}
          label="Date"
        />
        <YAxis
          domain={['dataMin', 'dataMax']}
          tickFormatter={(value) => value.toFixed(0)}
        />
        <Tooltip
          labelFormatter={(label) => {
            const date = formatDate(new Date(label));
            const time = formatTime(new Date(label));
            return `Date: ${date} Time: ${time}`;
          }}
        />
        <Legend />
        {graphData.map((portData, index) => (
          <Line
            key={portData.name}
            type="monotone"
            dataKey={portData.name}
            data={portData.data}
            stroke={lineColors[index % lineColors.length]}
            dot={false}
            activeDot={{ r: 8 }}
          />
        ))}
      </LineChart>


    </div>
  )}
    </Box>
  );
};

export default AnalyzeDateInt;
