import React from 'react';

const RecentExpenses = ({ expenses }) => {
  const recent = [...expenses]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="dashboard-section recent-expenses">
      <h3>Recent Expenses</h3>
      <table className="expenses-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {recent.map(exp => (
            <tr key={exp._id}>
              <td>{exp.title}</td>
              <td>₹{exp.amount}</td>
              <td>{new Date(exp.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentExpenses;
