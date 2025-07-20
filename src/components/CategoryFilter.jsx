import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const CategoryFilter = ({ onFilter }) => {
  const { categories } = useAppContext();
  const [selected, setSelected] = useState('');

  const handleChange = (e) => {
    const id = e.target.value;
    setSelected(id);
    onFilter(id);
  };

  return (
    <select value={selected} onChange={handleChange}>
      <option value="">All Categories</option>
      {categories.map(cat => (
        <option key={cat._id} value={cat._id}>{cat.name}</option>
      ))}
    </select>
  );
};

export default CategoryFilter;
