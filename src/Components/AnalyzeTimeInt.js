import { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Slider, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const AnalyzeTimeInt = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [timeRange, setTimeRange] = useState([0, 1430]);
  const [portNames, setPortNames] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const lineColors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#ff0000', '#00ff00', '#0000ff', '#ff00ff', '#00ffff', '#ffff00'];
  const [portNamesList, setPortNamesList] = useState([]);

  const getTimeLabel = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:00`;
  };

  const formatDate = (date) => {
    const formattedDate = new Date(date);
    const year = formattedDate.getFullYear();
    const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0');
    const day = formattedDate.getDate().toString().padStart(2, '0');
    return `${month}/${day}/${year}`;
  };

  function formatTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = remainingMinutes.toString().padStart(2, '0');
    
    return `${formattedHours}:${formattedMinutes}:00`;
  }
  

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    setSelectedDate(selectedDate);
    fetchPortNamesForDate(selectedDate);
  };

  const handleTimeChange = (event, newValue) => {
    if (newValue[0] <= newValue[1] - 30) {
      setTimeRange(newValue);
    }
  };

  const handlePortNameChange = (event) => {
    setPortNames(event.target.value);
  };
  
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/mtd/columnsDate/columnsTimeInt?date=${formatDate(
          selectedDate
        )}&startTime=${getTimeLabel(timeRange[0])}&endTime=${getTimeLabel(timeRange[1])}&columnNames=${portNames}`
      );
      console.log('Response:', response.data);
  
      const formattedData = [];

      Object.keys(response.data).forEach((time) => {
        const values = response.data[time];
        const [hours, minutes] = time.split(':');
        const date = new Date(2023, 0, 1, parseInt(hours), parseInt(minutes), 0);
        const data = { time: date };
  
        for (const port in values) {
          const value = parseFloat(values[port].replace(',', '.'));
  
          if (!isNaN(value) && value !== undefined) {
            data[port] = value;
          } else {
            throw new Error('Missing required data fields in the response.');
          }
        }
        formattedData.push(data);
      });

      formattedData.sort((a, b) => a.time - b.time);
      console.log('Formatted:', formattedData);
      setGraphData(formattedData);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting:', selectedDate, timeRange, portNames);
    fetchData();
  };

  const timeSliderMarks = [
    {
      value: timeRange[0],
      label: getTimeLabel(timeRange[0]),
      style: { color: 'red' },
    },
    {
      value: timeRange[1],
      label: getTimeLabel(timeRange[1]),
    },
  ];


  const fetchPortNamesForDate = (date) => {
    fetch(`http://localhost:8080/api/mtd/columnNamesByDate?date=${formatDate(date)}`)
      .then((response) => response.json())
      .then((data) => {
        setPortNamesList(data);
      })
      .catch((error) => {
        console.error('Error fetching column names:', error);
      });
  };

  useEffect(() => {
    if (selectedDate) {
      fetchPortNamesForDate(selectedDate);
    }
  }, [selectedDate]);
  

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
          <label>Select Date:</label>
          <TextField
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            inputProps={{ max: new Date().toISOString().split('T')[0] }}
          />
        </div>
        <div>
          <Typography id="time-slider-label" gutterBottom>
            Select Time Range:
          </Typography>
          <Slider
            value={timeRange}
            onChange={handleTimeChange}
            valueLabelDisplay="auto"
            step={10}
            marks={timeSliderMarks}
            min={0}
            max={1430}
            aria-labelledby="time-slider-label"
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
      {graphData.length > 0 && (
        <div>
          <h2>Graph</h2>
          <LineChart width={800} height={400} data={graphData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis
              domain={['dataMin', 'dataMax']}
              tickFormatter={(value) => value.toFixed(0)}
            />
            <Tooltip
              labelFormatter={(label) => {
                const hoveredDate = new Date(label);
                const hoveredTime = (hoveredDate.getHours() * 60) + hoveredDate.getMinutes();
                const startTime = hoveredTime;
                return `Time: ${formatTime(startTime)}`;
              }}
            />
            <Legend />
            {Object.keys(graphData[0])
              .filter((key) => key !== 'time')
              .map((port, index) => (
                <Line
                  key={port}
                  type="monotone"
                  dataKey={port}
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

export default AnalyzeTimeInt;
