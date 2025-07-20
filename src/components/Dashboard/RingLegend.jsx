import React, { useState } from 'react';

const RingLegend = ({ categoryTotals }) => {
  const [filter, setFilter] = useState('Monthly');
  const total = Object.values(categoryTotals).reduce((sum, val) => sum + val, 0);

  const colors = ['#7BAE7F', '#6FAF8F', '#8FBF7F', '#A3C9A8', '#91b191ff', '#9DBF9E', '#7F9C7A', '#88B378'];

  return (
    <div className="ring-legend">
      <select className="legend-filter" value={filter} onChange={e => setFilter(e.target.value)}>
        <option>Weekly</option>
        <option>Monthly</option>
        <option>Yearly</option>
      </select>

      <table className="legend-table">
        <tbody>
          {Object.entries(categoryTotals).map(([name, amount], idx) => (
            <tr key={idx}>
              <td>
                <span className="legend-color" style={{ backgroundColor: colors[idx % colors.length] }} />
              </td>
              <td>{name}</td>
              <td>{((amount / total) * 100).toFixed(1)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RingLegend;
