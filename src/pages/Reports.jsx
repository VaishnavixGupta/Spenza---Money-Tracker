import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import Sidebar from '../components/Sidebar';
import { Bar } from 'react-chartjs-2';
import '../styles/Reports.css';

const Report = () => {
  const { expenses, categories } = useAppContext();
  const [collapsed, setCollapsed] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState('');

  const filteredExpenses = selectedMonth
    ? expenses.filter((exp) => new Date(exp.date).getMonth() === parseInt(selectedMonth))
    : expenses;

    console.log("Filtered Expenses:", filteredExpenses);

  const totalIncome = expenses
    .filter((exp) => exp.type === 'income')
    .reduce((sum, exp) => sum + exp.amount, 0);

  const totalExpenses = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0); 

  const expenseRecords = expenses.filter((exp) => exp.type === 'expense');
  const averagePerRecord = filteredExpenses.length
  ? (filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0) / filteredExpenses.length).toFixed(2)
  : 0;

  const uniqueDates = [...new Set(filteredExpenses.map(exp => exp.date.slice(0, 10)))];
  const averagePerDay = uniqueDates.length
  ? (filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0) / uniqueDates.length).toFixed(2)
  : 0;

  const categoryTotals = categories.map((cat) => {
    const total = filteredExpenses
      .filter((exp) => exp.categoryId._id === cat._id)
      .reduce((sum, exp) => sum + exp.amount, 0);
    return { ...cat, total };
  });

  const monthlyData = Array.from({ length: 12 }, (_, i) => {
    const monthExpenses = expenses.filter(
      (exp) => new Date(exp.date).getMonth() === i
    );
    return monthExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  });

  const cashFlowChart = {
    labels: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ],
    datasets: [
      {
        label: 'Outflow',
        data: monthlyData,
        backgroundColor: '#f87171'
      }
    ]
  };

  return (
    <div className="report-layout">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed}/>
      <main className="report-main" style={{ marginLeft: collapsed ? '85px' : '270px',transition: 'margin-left 0.3s ease'}}>
        <div className="report-wrapper">
          <div className="report-card">
            <div className="report-table">
              <h3>Cash flow</h3>
              <table>
                <thead>
                  <tr>
                    <th>Overview</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Total Income</td>
                    <td>₹{totalIncome}</td>
                  </tr>
                  <tr>
                    <td>Total Expenses</td>
                    <td>₹{totalExpenses}</td>
                  </tr>
                  <tr>
                    <td>Average Expense (per Day)</td>
                    <td>₹{averagePerDay}</td>
                  </tr>
                  <tr>
                    <td>Average Expense (per Record)</td>
                    <td>₹{averagePerRecord}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="report-chart">
              <Bar data={cashFlowChart} />
            </div>

            <div className="category-breakdown">
              <h3>Category Breakdown</h3>
              {categoryTotals.map((cat) => (
                <div className="category-summary" key={cat._id}>
                    <div className="category-icon-badge" style={{ backgroundColor: cat.color }}>
                        <i className={`fas ${cat.icon}`}></i>
                        </div>
                    <span>{cat.name}</span>
                    <strong>₹{cat.total}</strong>
                    </div>
                ))}
                </div>

            <div className="report-filters">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                <option value="">All Months</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i} value={i}>
                    {new Date(0, i).toLocaleString('en-US', { month: 'long' })}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Report;
