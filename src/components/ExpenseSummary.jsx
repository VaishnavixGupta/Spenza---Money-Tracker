import React from 'react';
import { useAppContext } from '../context/AppContext';

const ExpenseSummary = () => {
  const { expenses, budget } = useAppContext();

  const totalSpent = expenses.reduce((acc, exp) => acc + exp.amount, 0);
  const averageSpent = (totalSpent / expenses.length || 0).toFixed(2);

  return (
    <div className="summary-card">
      <p><strong>Total Spent:</strong> ₹{totalSpent}</p>
      <p><strong>Average per Expense:</strong> ₹{averageSpent}</p>
      <div className="budget-bar">
        <div className="fill" style={{ width: `${Math.min((totalSpent / budget) * 100, 100)}%` }} />
      </div>
    </div>
  );
};

export default ExpenseSummary;