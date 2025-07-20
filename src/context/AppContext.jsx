import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [budget, setBudget] = useState(10000);

  const fetchExpenses = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('No token found in localStorage');
      return;
    }

    try {
      const res = await axios.get('/api/expenses', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setExpenses(res.data.expenses || res.data);
    } catch (err) {
      console.error('Failed to fetch expenses:', err.message);
    }
  };
  useEffect(() => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    setUser(JSON.parse(storedUser));
    console.log('Loaded user from localStorage:', storedUser);
  } else {
    console.warn('No user found in localStorage');
  }
}, []);

 useEffect(() => {
    fetchExpenses();
  }, []);

  useEffect(() => {
    const fetchExpenses = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.warn('No token found in localStorage');
        return;
      }

      try {
        const res = await axios.get('/api/expenses', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setExpenses(res.data.expenses || res.data);
      } catch (err) {
        console.error('Failed to fetch expenses:', err.response?.data?.message || err.message);
      }
    };

    fetchExpenses();
  }, []);

  const fetchCategories = async () => {
  try {
    const res = await axios.get('/api/categories');
    setCategories(res.data);
  } catch (err) {
    console.error('Failed to fetch categories:', err.message);
  }
};


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('/api/categories');
        setCategories(res.data);
      } catch (err) {
        console.error('Failed to fetch categories:', err.message);
      }
    };

    fetchCategories();
  }, []);

  const addExpense = (expense) => {
    setExpenses((prev) => [...prev, expense]);
  };

  const removeExpense = async (id) => {
  try {
    const token = localStorage.getItem('token');
    await axios.delete(`/api/expenses/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setExpenses((prev) => prev.filter((exp) => exp._id !== id));
  } catch (err) {
    console.error('Failed to delete expense:', err.response?.data?.message || err.message);
  }
};


  return (
    <AppContext.Provider value={{user, setUser, expenses, setExpenses, addExpense, fetchExpenses, removeExpense, categories, fetchCategories, setCategories, budget, setBudget }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);