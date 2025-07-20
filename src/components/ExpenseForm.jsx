import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { submitExpense } from '../services/expenseService';

const ExpenseForm = () => {
  const { addExpense, categories } = useAppContext();

  const [form, setForm] = useState({
    title: '',
    amount: '',
    categoryId: '',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (categories.length > 0 && !form.categoryId) {
      setForm((prev) => ({ ...prev, categoryId: categories[0]._id }));
    }
  }, [categories]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting:', form);

    const expenseData = {
      title: form.title,
      amount: parseFloat(form.amount || 0),
      categoryId: form.categoryId,
      date: form.date
    };

    try {
      const savedExpense = await submitExpense(expenseData);
      console.log('Expense saved:', savedExpense);
      addExpense(savedExpense.expense);

      setForm({
        title: '',
        amount: '',
        categoryId: categories[0]?._id || '',
        date: new Date().toISOString().split('T')[0]
      });
    } catch (err) {
      console.error('Failed to save expense:', err.response?.data || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <div className="form-row">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Expense title"
          required
        />
        <input
          name="amount"
          type="number"
          value={form.amount}
          onChange={handleChange}
          placeholder="Amount"
          required
        />
        <select name="categoryId" value={form.categoryId} onChange={handleChange} required>
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Expense</button>
      </div>
    </form>
  );
};

export default ExpenseForm;
