import UpperBar from './UpperBar';
import React, { useState } from 'react';
import axios from 'axios';
import '../CSS/ViewData.css';
import { TextField, Button } from '@mui/material';
import styled from 'styled-components';

const ViewData = () => {
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [columnUnitsMap, setColumnUnitsMap] = useState({});

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    fetchColumnUnits();
  };
  
  const fetchDataByDate = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/mtd/date?date=${formatDate(selectedDate)}`);
      const sortedData = response.data.sort((a, b) => a.time.localeCompare(b.time));
      setData(sortedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchColumnUnits = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/mtd/getPortUnit');
      console.log('Column units:', response.data);
      setColumnUnitsMap(response.data);
    } catch (error) {
      console.error('Error fetching column units:', error);
    }
  };
  
  const formatDate = (date) => {
    const formattedDate = new Date(date);
    const year = formattedDate.getFullYear();
    const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0');
    const day = formattedDate.getDate().toString().padStart(2, '0');
    return `${month}/${day}/${year}`;
  };

  const LargerHeaderCell = styled.th`
    height: 41px;
    font-size: 16px;
  `;


  return (
    <div>
      <UpperBar />
      <div>
        <h1>GÜNAM</h1>
        <div>
          <label>Select Date:</label>
          <TextField
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            inputProps={{ max: new Date().toISOString().split('T')[0] }}
          />
          <Button variant="contained" onClick={fetchDataByDate}>
            Fetch Data
          </Button>
        </div>
        <div className="table-container">
          <table className="fixed-table">
            
            <thead>
              <tr>
                <LargerHeaderCell>Date</LargerHeaderCell>
                <LargerHeaderCell>Time</LargerHeaderCell>
              </tr>
            </thead>
            <tbody>
              {data.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.date}</td>
                  <td>{entry.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <table className="scroll-table">
              <thead>
                <tr>
                  {Object.keys(data[0]?.columns || {}).map((columnName, index) => (
                    <th key={columnName} className={index % 2 === 0 ? 'color1' : 'color2'}>
                      {columnName} ({columnUnitsMap[columnName]}) {/* Displaying units */}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((entry, index) => (
                  <tr key={index}>
                    {Object.values(entry.columns || {}).map((columnValue, columnIndex) => (
                      <td key={columnIndex} className={columnIndex % 2 === 0 ? 'color1' : 'color2'}>
                        {columnValue}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewData;