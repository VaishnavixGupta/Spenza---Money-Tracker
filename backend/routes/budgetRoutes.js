  const express = require('express');
  const router = express.Router();
  const Budget = require('../models/Budget');
  const mongoose = require('mongoose');

  router.get('/budget', async (req, res) => {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ error: 'Missing userId' });

    try {
      const budgets = await Budget.find({ userId });
      res.json(budgets);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch budgets' });
    }
  });

  router.post('/budget', async (req, res) => {
    console.log('Incoming budget payload:', req.body);
    const { userId, amount, period, category } = req.body;
    if (!userId || !amount || !period || !category) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const query = {
    userId: new mongoose.Types.ObjectId(userId),
    period,
    category
  };
    try {
    const budget = await Budget.findOneAndUpdate(
      query,
      { userId: query.userId, amount, period, category },
      { upsert: true, new: true }
    );
    res.json(budget);
  } catch (err) {
    console.error('Error saving budget:', err);
    res.status(500).json({ error: 'Failed to save budget' });
  }
});

  router.delete('/budget/:id', async (req, res) => {
    try {
      await Budget.findByIdAndDelete(req.params.id);
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete budget' });
    }
  });

  module.exports = router;
