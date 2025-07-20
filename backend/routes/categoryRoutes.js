const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

router.get('/', async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch categories', error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, color, icon} = req.body;
    const newCategory = await Category.create({ name, color, icon });
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create category', error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { name, color, icon } = req.body;
    const updated = await Category.findByIdAndUpdate(req.params.id, { name, color, icon} , { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update category', error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete category', error: err.message });
  }
});


module.exports = router;
