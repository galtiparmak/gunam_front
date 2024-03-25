import UpperBar from './UpperBar';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const Home = () => {
  const [allColumns, setAllColumns] = useState([]);
  const [nonDefaultColumns, setNonDefaultColumns] = useState([]);
  const [yesterdayDate, setYesterdayDate] = useState('');
  const [columnUnitsMap, setColumnUnitsMap] = useState({});
  const [columnNamesMap, setColumnNamesMap] = useState({});

  useEffect(() => {
    fetchAllColumns();
    fetchNonDefaultColumns();
    setYesterdayDate(getYesterdayDate());
    fetchColumnUnits();
    fetchColumnNames();
  }, []);

  const fetchAllColumns = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/mtd/allColumns');
      const filteredColumns = response.data.filter(columnName => columnName !== 'date' && columnName !== 'time');
      setAllColumns(filteredColumns);
    } catch (error) {
      console.error('Error fetching columns:', error);
    }
  };
  

  const fetchNonDefaultColumns = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/mtd/yesterday`);
      const columnNames = response.data.map((entry) => Object.keys(entry.columns)).flat();
      const uniqueColumnNames = Array.from(new Set(columnNames));
      setNonDefaultColumns(uniqueColumnNames);
    } catch (error) {
      console.error('Error fetching non-default columns:', error);
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

  const fetchColumnNames = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/mtd/getPortName');
      console.log('Column names:', response.data);
      setColumnNamesMap(response.data);
    } catch (error) {
      console.error('Error fetching column units:', error);
    }
  };

  const getYesterdayDate = () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return yesterday.toLocaleDateString(undefined, options);
  };

  const renderActiveColumnsTable = () => {
    return (
      <TableContainer component={Paper}>
        <h3>Active Ports</h3>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Ports</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allColumns.map((columnName) => {
              if (nonDefaultColumns.includes(columnName)) {
                return (
                  <TableRow key={columnName} style={{ backgroundColor: 'green' }}>
                    <TableCell style={{ fontSize: '12px', padding: '4px', textAlign: 'center' }}>
                      {columnName} ({columnUnitsMap[columnName]}) ({columnNamesMap[columnName]})
                    </TableCell>
                  </TableRow>
                );
              }
              return null;
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const renderNonActiveColumnsTable = () => {
    return (
      <TableContainer component={Paper}>
        <h3>Non-Active Ports</h3>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Ports</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allColumns.map((columnName) => {
              if (!nonDefaultColumns.includes(columnName)) {
                return (
                  <TableRow key={columnName} style={{ backgroundColor: 'red' }}>
                    <TableCell style={{ fontSize: '12px', padding: '4px', textAlign:'center' }}>
                      {columnName} ({columnUnitsMap[columnName]}) ({columnNamesMap[columnName]})
                      </TableCell>
                  </TableRow>
                );
              }
              return null;
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <div>
      <UpperBar />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px' }}>
        <h2>Yesterday's Data: {yesterdayDate}</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ flex: 1, marginRight: '20px' }}>{renderActiveColumnsTable()}</div>
          <div style={{ flex: 1 }}>{renderNonActiveColumnsTable()}</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
