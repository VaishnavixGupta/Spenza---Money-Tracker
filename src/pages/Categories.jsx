import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import Sidebar from '../components/Sidebar';
import CategoryForm from '../components/CategoryForm';
import CategoryTable from '../components/CategoryTable';
import '../styles/Categories.css';

const Category = () => {
  const { categories } = useAppContext();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="categories-layout">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <main
        className="categories-main"
        style={{
          marginLeft: collapsed ? '85px' : '270px',
          transition: 'margin-left 0.3s ease'
        }}
      >
        <div className="categories-wrapper">
          <div className="categories-card">
            <h2 className="page-title">Manage Categories</h2>
            <CategoryForm />
            {categories.length === 0 ? (
              <p style={{ opacity: 0.6 }}>No categories added yet.</p>
            ) : (
              <CategoryTable />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Category;
