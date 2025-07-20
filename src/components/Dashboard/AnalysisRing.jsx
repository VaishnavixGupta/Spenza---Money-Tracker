import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const AnalysisRing = ({ expenses }) => {
  const categoryTotals = {};

  expenses.forEach(exp => {
    const name = exp.categoryId?.name || 'Other';
    categoryTotals[name] = (categoryTotals[name] || 0) + exp.amount;
  });

  const categoryColors = {
  Food: '#7BAE7F',
  Health: '#6FAF8F',
  Travel: '#8FBF7F',
  Shopping: '#A3C9A8',
  Entertainment: '#91b191ff',
  Bills: '#6E8B6D',
  Savings: '#9DBF9E',
  Utilities: '#88B378'
};

const labels = Object.keys(categoryTotals);

const backgroundColors = labels.map(label => categoryColors[label] || '#64748b');

  const options = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '60%',
  spacing: 4, 
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (context) => `${context.label}: ₹${context.raw}`
      }
    }
  }
};


  const data = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: backgroundColors,
        borderWidth: 0,
        borderRadius: 4,
        spacing: 10
      },
    ],
  };

  return (
    <div className="dashboard-section analysis-ring">
      <h3>Expenditure</h3>
      <div style={{ width: '100%', maxWidth: '240px', height: '240px' }}>
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default AnalysisRing;
