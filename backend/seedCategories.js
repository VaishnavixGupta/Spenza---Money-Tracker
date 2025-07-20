const mongoose = require('mongoose');
const Category = require('./models/Category');

mongoose.connect('mongodb://localhost:27017/expenseDB');

const predefined = [
  { name: 'Food' , color:'#f87171' , icon: 'fa-utensils'},
  { name: 'Health', color:'#34d399' , icon: 'fa-heart' },
  { name: 'Travel', color:'#38bdf8' , icon: 'fa-bus'},
  { name: 'Shopping', color:'#f97316' , icon: 'fa-shopping-cart'},
  { name: 'Entertainment', color:'#c084fc' , icon: 'fa-film' },
  { name: 'Bills' , color:'#64748b' , icon: 'fa-file-invoice'},
  { name: 'Savings' ,color:'#22c55e' , icon: 'fa-piggy-bank'},
  { name: 'Utilities', color:'#94a3b8' , icon: 'fa-tag' },
];

const seed = async () => {
  try {
    await Category.insertMany(predefined);
    console.log('✅ Categories seeded');
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
  } finally {
    mongoose.disconnect();
  }
};

seed();
