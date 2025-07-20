import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { Pie } from 'react-chartjs-2';
import { useAppContext } from '../context/AppContext';

const ExpenseChart = () => {
  const { expenses, categories } = useAppContext();
  const chartContainerRef = useRef(null);

    useEffect(() => {
    return () => {
      if (chartContainerRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  const categoryColors = {
  Food: '#f87171',
  Travel: '#fbbf24',
  Bills: '#60a5fa',
  Health: '#34d399',
  Entertainment: '#c084fc',
  Education: '#4ade80'
};

  const grouped = categories.map(cat => {
    const total = expenses
      .filter(exp => {
        const id = exp.categoryId?._id || exp.categoryId;
        return String(id) === String(cat._id);
      })
      .reduce((acc, exp) => acc + exp.amount, 0);
    return { name: cat.name, total };
  }).filter(g => g.total > 0);

console.log('Expense categoryId values:', expenses.map(e => e.categoryId));
console.log('Fetched expenses:', expenses);
  console.log('Grouped chart data:', grouped);

  if (grouped.length === 0) {
    return (
      <div className="chart-container" ref={chartContainerRef}>
        <h3>Spending Breakdown</h3>
        <p style={{ color: '#ccc', marginTop: '1rem' }}>No spending data available.</p>
      </div>
    );
  }

  const labels = grouped.map(g => g.name);

const backgroundColor = grouped.map(g => categoryColors[g.name] || '#94a3b8');

  const data = {
    labels,
    datasets: [{
      data: grouped.map(g => g.total),
      backgroundColor ,
      borderWidth: 1
    }]
  };

  const options = {
  plugins: {
    legend: { display: false },
    tooltip: { enabled: true,
      callbacks: {
        label: (context) => {
          const label = context.label || '';
          const value = context.raw || 0;
          return `${label}: ₹${value}`;
        }
      }
    }
    }
  };

  return (
    <div className="chart-container" ref={chartContainerRef}>
      <h3>Spending</h3>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', maxWidth: '240px', height: '200px'}}>
      <Pie key={JSON.stringify(data)} data={data} options={options}/>
      </div>
    </div>
  );
};

export default ExpenseChart;
