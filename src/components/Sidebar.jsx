import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const sidebarRef = useRef(null);
  const menuTogglerRef = useRef(null);
  const location = useLocation();

  const primaryItems = [
    { label: 'Dashboard', icon: 'dashboard', path: '/dashboard' },
    { label: 'Add Expense', icon: 'add_circle', path: '/add-expense' },
    { label: 'Expenses', icon: 'receipt_long', path: '/expenses' },
    { label: 'Categories', icon: 'category', path: '/categories' },
    { label: 'Reports', icon: 'bar_chart', path: '/reports' }
  ];

  const secondaryItems = [
    { label: 'Profile', icon: 'account_circle', path: '/dashboard' },
    { label: 'Logout', icon: 'logout', path: '/login' }
  ];

  const updateSidebarHeight = (isMenu) => {
    const sidebar = sidebarRef.current;
    if (!sidebar) return;

    if (window.innerWidth >= 1024) {
      sidebar.style.height = 'calc(100vh - 32px)';
    } else {
      sidebar.style.height = isMenu ? `${sidebar.scrollHeight}px` : '56px';
    }

    const span = menuTogglerRef.current?.querySelector('span');
    if (span) span.innerText = isMenu ? 'close' : 'menu';
  };

  useEffect(() => {
    const handleResize = () => {
      const sidebar = sidebarRef.current;
      if (window.innerWidth >= 1024) {
        sidebar?.classList.remove('collapsed');
        setCollapsed(false);
        setMenuActive(false);
        sidebar.style.height = 'calc(100vh - 32px)';
      } else {
        sidebar?.classList.remove('collapsed');
        setCollapsed(false);
        sidebar.style.height = 'auto';
        updateSidebarHeight(menuActive);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [menuActive]);

  return (
    <aside
      className={`sidebar${collapsed ? ' collapsed' : ''}${
        menuActive ? ' menu-active' : ''
      }`}
      ref={sidebarRef}
    >
      <header className="sidebar-header">
        {/*<Link to="/" className="header-logo"> <img src="/vite.svg" alt="Logo" className={`logo-img ${collapsed ? 'collapsed' : ''}`}/> </Link> */}
        <button
          className="toggler sidebar-toggler"
          onClick={() => setCollapsed(prev => !prev)}
        >
          <span className="material-symbols-rounded">
            {collapsed ? 'chevron_right' : 'chevron_left'}
          </span>
        </button>

        <button
          className="toggler menu-toggler"
          ref={menuTogglerRef}
          onClick={() => {
            const newState = !menuActive;
            setMenuActive(newState);
            updateSidebarHeight(newState);
          }}
        >
          <span className="material-symbols-rounded">menu</span>
        </button>
      </header>

      <nav className="sidebar-nav">
        <ul className="nav-list primary-nav">
          {primaryItems.map(({ label, icon, path }) => (
            <li className="nav-item" key={path}>
              <Link
                to={path}
                className={`nav-link${location.pathname === path ? ' active' : ''}`}
              >
                <span className="nav-icon material-symbols-rounded">{icon}</span>
                <span className="nav-label">{label}</span>
              </Link>
              <span className="nav-tooltip">{label}</span>
            </li>
          ))}
        </ul>

        <ul className="nav-list secondary-nav">
          {secondaryItems.map(({ label, icon, path }) => (
            <li className="nav-item" key={path}>
              <Link to={path} className="nav-link">
                <span className="nav-icon material-symbols-rounded">{icon}</span>
                <span className="nav-label">{label}</span>
              </Link>
              <span className="nav-tooltip">{label}</span>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
