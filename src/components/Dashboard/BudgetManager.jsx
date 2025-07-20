import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';

const BudgetManager = ({ categories, expenses }) => {
  const { user } = useAppContext();
  const userId = user?.id;

  const [inputAmount, setInputAmount] = useState('');
  const [inputPeriod, setInputPeriod] = useState('monthly');
  const [inputCategory, setInputCategory] = useState('all');
  const [budgets, setBudgets] = useState([]);
  const [alertedBudgets, setAlertedBudgets] = useState([]);

  const safeExpenses = Array.isArray(expenses) ? expenses : [];

  const fetchBudgets = async () => {
    if (!userId) return;
    try {
      const res = await fetch(`/api/budget?userId=${userId}`);
      const data = await res.json();
      setBudgets(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Budget fetch failed:', err);
    }
  };

  const handleAddBudget = async () => {
    if (!userId) {
      console.warn('User ID missing — cannot save budget');
      return;
    }
    try {
      await fetch('/api/budget', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          amount: Number(inputAmount),
          period: inputPeriod,
          category: inputCategory
        })
      });
      setInputAmount('');
      setAlertedBudgets([]);
      fetchBudgets();
    } catch (err) {
      console.error('Error saving budget:', err);
    }
  };

  const handleDeleteBudget = async (id) => {
    try {
      await fetch(`/api/budget/${id}`, { method: 'DELETE' });
      setBudgets(prev => prev.filter(b => b._id !== id));
      setAlertedBudgets(prev => prev.filter(alertId => alertId !== id));
    } catch (err) {
      console.error('Error deleting budget:', err);
    }
  };

  const filterExpensesForBudget = (budget) => {
    const now = new Date();
    return safeExpenses.filter(exp => {
      const date = new Date(exp.date);
      const matchCategory = budget.category === 'all' || exp.categoryId?.name === budget.category;

      if (!matchCategory) return false;

      if (budget.period === 'weekly') {
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());
        return date >= startOfWeek;
      }

      if (budget.period === 'monthly') {
        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
      }

      if (budget.period === 'yearly') {
        return date.getFullYear() === now.getFullYear();
      }

      return true;
    });
  };

  useEffect(() => {
    fetchBudgets();
  }, [userId]);

  useEffect(() => {
    budgets.forEach(budget => {
      const filtered = filterExpensesForBudget(budget);
      const total = filtered.reduce((acc, exp) => acc + exp.amount, 0);

      if (total > budget.amount && !alertedBudgets.includes(budget._id)) {
        alert(`!! Budget exceeded for "${budget.category}" (${budget.period})! Spent ₹${total}, Budget ₹${budget.amount}`);
        setAlertedBudgets(prev => [...prev, budget._id]);
      }
    });
  }, [budgets, safeExpenses]);

  return (
    <div className="dashboard-section" style={{
      padding: '24px',
      borderRadius: '12px',
      border: '1px solid rgba(255,255,255,0.1)',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      maxHeight: '80vh',
      overflowY: 'auto',
      scrollbarWidth: 'none',
      msOverflowStyle: 'none'
    }}>
      <h3>Budget Manager</h3>

      <label>Budget Amount (₹)</label>
      <input
        type="text"
        value={inputAmount}
        onChange={(e) => setInputAmount(e.target.value)}
        placeholder="Enter budget"
        className="legend-filter"
      />

      <label>Period</label>
      <select
        value={inputPeriod}
        onChange={(e) => setInputPeriod(e.target.value)}
        className="legend-filter"
      >
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>

      <label>Category</label>
      <select
        value={inputCategory}
        onChange={(e) => setInputCategory(e.target.value)}
        className="legend-filter"
      >
        <option value="all">All Categories</option>
        {Array.isArray(categories) && categories.map(cat => (
          <option key={cat._id} value={cat.name}>{cat.name}</option>
        ))}
      </select>

      <button
        onClick={handleAddBudget}
        style={{
          padding: '8px 12px',
          backgroundColor: '#4b84c5',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold',
          maxWidth: '140px'
        }}
      >
        Add Budget
      </button>

      <hr />

      <h4 style={{ marginTop: '12px' }}>Your Budgets</h4>
      {Array.isArray(budgets) && budgets.length === 0 && (
        <p style={{ color: '#94a3b8' }}>No budgets set yet.</p>
      )}
      {Array.isArray(budgets) && budgets.map(b => (
        <div key={b._id} style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px 12px',
          backgroundColor: '#1e293b',
          borderRadius: '8px',
          marginBottom: '8px',
          color: '#f1f5f9'
        }}>
          <span>₹{b.amount} for "{b.category}" ({b.period})</span>
          <button
            onClick={() => handleDeleteBudget(b._id)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#f87171',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default BudgetManager;
