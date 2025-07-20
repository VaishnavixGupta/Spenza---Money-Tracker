const Expense = require('../models/Expense');

exports.addExpense = async (req, res) => {
  try {
    const { title, amount, categoryId, date } = req.body;
    if (!title || !amount || !categoryId || !date) {
    return res.status(400).json({ message: 'Missing required fields' });
    }
    const newExpense = new Expense({title, amount, categoryId, date, userId: req.user.id});
    await newExpense.save();
    res.status(201).json({ success: true, expense: newExpense });
  } catch (err) {
    res.status(500).json({ message: 'Failed to save expense', error: err.message });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id }).populate('categoryId').sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching expenses', error: err.message });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    await Expense.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete expense' });
  }
};

