import React from 'react';
import { useAppContext } from '../context/AppContext';
import CategoryRow from './CategoryRow';

const CategoryTable = () => {
  const { categories } = useAppContext();

  return (
    <table className="category-table">
      <thead>
        <tr>
          <th>Color</th>
          <th>Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((cat) => (
          <CategoryRow key={cat._id} category={cat} />
        ))}
      </tbody>
    </table>
  );
};

export default CategoryTable;
