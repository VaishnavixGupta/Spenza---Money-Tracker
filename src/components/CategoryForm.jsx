import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import * as FaIcons from 'react-icons/fa';
import axios from 'axios';

const CategoryForm = () => {
  const {setCategories } = useAppContext();
  const [name, setName] = useState('');
  const [color, setColor] = useState('#60a5fa');
  const [icon, setIcon] = useState('fa-tag');
  const [error, setError] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const iconOptions = ['fa-utensils', 'fa-wine-glass', 'fa-car', 'fa-bus', 'fa-heart', 'fa-book', 'fa-film', 'fa-shopping-bag', 'fa-tag', 'fa-piggy-bank', 'fa-file-invoice', 'fa-hand-holding-heart'];

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      const res = await axios.post('http://localhost:5000/api/categories', {
        name: name.trim(),
        color,
        icon
      });
      setCategories(prev => [...prev, res.data]);
      setName('');
      setColor('#60a5fa');
      setIcon('fa-tag');
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add category');
    }
  };

  return (
    <>
      <form onSubmit={handleAdd} className="category-form">
        <input
          type="text"
          placeholder="New category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="colorPicker">Pick a color:</label>
        <input 
          type="color" 
          value={color} 
          onChange={(e) => setColor(e.target.value)}
          style={{ width: '40px', height: '40px', border: 'none', cursor: 'pointer' }}
        />
        <div className="icon-dropdown-container">
          <button  type="button" className="dropdown-toggle" onClick={() => setShowDropdown(!showDropdown)}>
            <i className={`fas ${icon}`} /> <span>Select Icon</span>
            <i className="fas fa-chevron-down" />
          </button>
        {showDropdown && (<div className="icon-dropdown-list">
          {iconOptions.map((key) => (<button key={key} onClick={() => {setIcon(key); setShowDropdown(false);}}
          className={`icon-dropdown-item ${icon === key ? 'selected' : ''}`}>
          <i className={`fas ${key}`} /></button>
      ))}
    </div>
  )}
  </div>
        <button type="submit">Add</button>
      </form>
      {error && <p className="error">{error}</p>}
    </>
  );
};

export default CategoryForm;
