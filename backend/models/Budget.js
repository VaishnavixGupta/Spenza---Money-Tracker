const mongoose = require('mongoose');

const BudgetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  amount: { type: Number, required: true },
  period: { type: String, enum: ['weekly', 'monthly', 'yearly'], required: true },
  category: { type: String, default: 'all' }
});

module.exports = mongoose.model('Budget', BudgetSchema);
