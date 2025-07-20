import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';

const TrendChart = ({ expenses }) => {
  const [filter, setFilter] = useState('weekly');
  const handleChange = (e) => setFilter(e.target.value);

  const data = {
  labels: [],
  datasets: [{
    label: 'Spending',
    data: [],
    borderColor: '#3b82f6',
    tension: 0.4,
    fill: false
  }]
};

  return (
    <div className="dashboard-section trend-chart">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>Summary</h3>
        <select className="legend-filter" value={filter} onChange={handleChange}>
          <option value="this week">Weekly</option>
          <option value="this month">Monthly</option>
        </select>
      </div>
      <div style={{ width: '100%', height: '240px', position: 'relative' ,border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', padding: '16px', boxSizing: 'border-box'}}>
        <Line data={data} />
      </div>
    </div>
  );
};

export default TrendChart;
