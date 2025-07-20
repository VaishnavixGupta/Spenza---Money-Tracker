import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import axios from 'axios';

const CategoryRow = ({ category }) => {
  const { setCategories } = useAppContext();
  const [editId, setEditId] = useState(null);
  const [editedName, setEditedName] = useState(category.name);
  const [editedIcon, setEditedIcon] = useState(category.icon || 'fa-tag');
  const [editedColor, setEditedColor] = useState(category.color || '#60a5fa');

  const iconOptions = [
    'fa-utensils',
    'fa-bus',
    'fa-heart',
    'fa-book',
    'fa-film',
    'fa-shopping-cart',
    'fa-tag'
  ];

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/categories/${category._id}`);
      setCategories(prev => prev.filter(cat => cat._id !== category._id));
    } catch (err) {
      console.error('Delete failed:', err.message);
    }
  };

  const handleEdit = async () => {
    try {
      const res = await axios.put(`/api/categories/${category._id}`, {
        name: editedName,
        icon: editedIcon,
        color: editedColor
      });
      setCategories(prev =>
        prev.map(cat => (cat._id === category._id ? res.data : cat))
      );
      setEditId(null);
    } catch (err) {
      console.error('Edit failed:', err.message);
    }
  };

  return (
    <tr>
      <td>
        {editId === category._id ? (
          <input
            type="color"
            value={editedColor}
            onChange={(e) => setEditedColor(e.target.value)}
            style={{ border: 'none', padding: 0, width: 32, height: 32 }}
          />
        ) : (
          <span className="category-icon-circle" style={{ backgroundColor: category.color }}>
            <i className={`fas ${category.icon}`} />
          </span>
        )}
      </td>
      
      <td>
        {editId === category._id ? (
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
        ) : (
          category.name
        )}
      </td>

      <td>
        {editId === category._id ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <select
              value={editedIcon}
              onChange={(e) => setEditedIcon(e.target.value)}
            >
              {iconOptions.map((ic) => (
                <option key={ic} value={ic}>
                  {ic.replace('fa-', '')}
                </option>
              ))}
            </select>
            <button onClick={handleEdit}>💾</button>
          </div>
        ) : (
          <>
            <button
              onClick={() => {
                setEditId(category._id);
                setEditedName(category.name);
                setEditedIcon(category.icon || 'fa-tag');
                setEditedColor(category.color || '#60a5fa');
              }}
            >
              ✏️
            </button>
            <button onClick={handleDelete}>🗑️</button>
          </>
        )}
      </td>
    </tr>
  );
};

export default CategoryRow;
