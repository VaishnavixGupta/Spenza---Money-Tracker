import React, { useState } from 'react';

const DateFilter = ({ onDateFilter }) => {
  const [selectedDate, setSelectedDate] = useState('');

  const handleChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    onDateFilter(date);
  };

  return (
    <input
      type="date"
      value={selectedDate}
      onChange={handleChange}
      className="date-filter"
    />
  );
};

export default DateFilter;
