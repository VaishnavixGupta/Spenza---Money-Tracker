const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, unique: true},
  color: { type: String, default: '#60a5fa' },
  icon: { type: String, default: 'fa-tag' }},
  { timestamps: true},
);
module.exports = mongoose.model('Category', categorySchema);