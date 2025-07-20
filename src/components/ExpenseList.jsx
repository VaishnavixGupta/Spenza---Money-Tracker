import React from 'react';
import { useAppContext } from '../context/AppContext';

const ExpenseList = ({ expenses = [] }) => {
  const { categories, removeExpense } = useAppContext();

  const getCategoryName = (categoryRef) => {
  const id = categoryRef?._id || categoryRef;
  const match = categories.find((cat) => cat._id === id);
  return match ? match.name : 'Uncategorized';
  };

  const formatDate = (d) => {
    const parsed = new Date(d);
    return isNaN(parsed)
      ? 'Invalid Date'
      : parsed.toLocaleDateString('en-GB', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
  };

  const handleDelete = async (id) => {
    await removeExpense(id);
  };

  if (!Array.isArray(expenses) || expenses.length === 0) {
    return <p>No expenses added yet.</p>;
  }

  return (
    <div className="expense-list">
      {expenses.map((expense, index) => {
        console.log('Expense categoryId:', expense.categoryId);
        return (
        <div
          key={expense._id || `${expense.title}-${expense.date}-${index}`}
          className="expense-item"
        >
          <div>
            <strong>{expense.title}</strong> — ₹{expense.amount}
            <div className="expense-meta">
              {getCategoryName(expense.categoryId)} • {formatDate(expense.date)}
            </div>
          </div>
          <button onClick={() => handleDelete(expense._id)}>Delete</button>
        </div>
      )})}
    </div>
  );
};

export default ExpenseList;
