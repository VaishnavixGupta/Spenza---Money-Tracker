import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import Sidebar from '../components/Sidebar';
import ExpenseSummary from '../components/ExpenseSummary';
import CategoryFilter from '../components/CategoryFilter';
import ExpenseChart from '../components/ExpenseChart';
import ExpenseList from '../components/ExpenseList';
import '../styles/Expenses.css';

const Expenses = () => {
  const { expenses, categories, fetchExpenses } = useAppContext();
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [collapsed, setCollapsed] = useState(false);

  console.log('Expenses:', expenses);
console.log('Categories:', categories);


  useEffect(() => {
    fetchExpenses();
  }, []);

    useEffect(() => {
    applyFilters(selectedCategory, selectedDate);
  }, [expenses, selectedCategory, selectedDate]);

  const handleCategoryFilter = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleDateFilter = (date) => {
    setSelectedDate(date);
  };

  const applyFilters = (categoryId, date) => {
    let filtered = [...expenses];
    if (categoryId) {
      filtered = filtered.filter(
        (exp) => String(exp.categoryId._id) === String(categoryId)
      );
    }
    if (date) {
      filtered = filtered.filter(
        (exp) => exp.date.slice(0, 10) === date
      );
    }
    setFilteredExpenses(filtered);
  };

  return (
    <div className="expenses-layout">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <main
        className="expenses-main"
        style={{
          marginLeft: collapsed ? '85px' : '270px',
          transition: 'margin-left 0.3s ease'
        }}
      >
      <div className="expenses-wrapper">
      <div className="expenses-card">
      <h2>Your Expenses</h2>
      <ExpenseSummary />
      <div className="filter-row">
      <CategoryFilter onFilter={handleCategoryFilter} />
      <input
          type="date"
          value={selectedDate}
          onChange={(e) => handleDateFilter(e.target.value)}
          className="date-filter"
      />
      </div>
      <ExpenseChart />
      <div className="scrollable-expense-list">
      <ExpenseList expenses={filteredExpenses} />
      </div>
      </div>
      </div>
      </main>
  </div>
  );
};

export default Expenses;
