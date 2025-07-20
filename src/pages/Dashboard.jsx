import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import BudgetManager from '../components/Dashboard/BudgetManager';
import AnalysisRing from '../components/Dashboard/AnalysisRing';
import RingLegend from '../components/Dashboard/RingLegend';
import RecentExpenses from '../components/Dashboard/RecentExpenses';
import Subscriptions from '../components/Dashboard/Subscriptions';
import CryptoAd from '../components/Dashboard/CryptoAd';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    const fetchExpenses = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await fetch('/api/expenses', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setExpenses(data);
      } catch (err) {
        console.error('Failed to fetch expenses:', err);
      }
    };

    fetchExpenses();
  }, []);

  const categoryTotals = {};
expenses.forEach(exp => {
  const name = exp.categoryId?.name || 'Other';
  categoryTotals[name] = (categoryTotals[name] || 0) + exp.amount;
});

  return (
    <div className="dashboard-layout">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <main className="dashboard-main" style={{ marginLeft: collapsed ? '85px' : '270px' }}>
        <div className="dashboard-card">
          <div className="dashboard-header">
            <h1>Dashboard</h1>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>

          <div className="dashboard-grid">
  <div className="grid-left">
    <div className="trend-chart">
    <BudgetManager categories={categories} expenses={expenses} />
    </div>
    <RecentExpenses expenses={expenses} />
  </div>

<div className="grid-right">
  <div className="analysis-wrap">
    <AnalysisRing expenses={expenses} />
    <RingLegend categoryTotals={categoryTotals} />
  </div>
  <Subscriptions expenses={expenses} />
    <CryptoAd />
  </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
