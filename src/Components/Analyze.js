import React, { useState } from 'react';
import UpperBar from './UpperBar';
import AnalyzeTimeInt from './AnalyzeTimeInt';
import AnalyzeDateInt from './AnalyzeDateInt';

const Analyze = () => {
  const [selectedOption, setSelectedOption] = useState('date');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const getSelectedComponent = () => {
    switch (selectedOption) {
      case 'date':
        return <AnalyzeDateInt />;
      case 'time':
        return <AnalyzeTimeInt />;
      default:
        return null;
    }
  };

  return (
    <div>
      <UpperBar />
      <select value={selectedOption} onChange={handleOptionChange}>
        <option value="date">Analyze With Date</option>
        <option value="time">Analyze With Time</option>
      </select>
      <div>
        {getSelectedComponent()}
      </div>
    </div>
  );
};

export default Analyze;
