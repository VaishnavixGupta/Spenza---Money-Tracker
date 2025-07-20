import React from 'react';
import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import Sidebar from '../components/Sidebar';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import '../styles/AddExpense.css';

const AddExpense = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { expenses } = useAppContext();

  return (
    <div className="add-expense-layout">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <main
        className="add-expense-main"
        style={{
          marginLeft: collapsed ? '85px' : '270px',
          transition: 'margin-left 0.3s ease'
        }}
      >
        <div className="add-expense-wrapper">
        <div className="add-expense-card">
          <h2>Add Expense</h2>
          <ExpenseForm />
          <h3>Recent Expenses</h3>
          <div className="scrollable-expense-list">
          <ExpenseList expenses={expenses} />
          </div>
        </div>
        </div>
      </main>
    </div>
  );
};

export default AddExpense;