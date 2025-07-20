const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
  try {
    const { name, color } = req.body;
    const category = await Category.create({ name, color });
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: 'Server error while creating category' });
  }
};
