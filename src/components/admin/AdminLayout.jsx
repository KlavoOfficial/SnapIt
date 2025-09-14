import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h1 className="admin-logo">SnapIt Admin</h1>
        <nav className="admin-nav">
          <Link to="/admin/dashboard">Dashboard</Link>
          <Link to="/admin/users">Users</Link>
          <Link to="/admin/products">Products</Link>
          <Link to="/admin/orders">Orders</Link>
          <Link to="/admin/feedback">Feedback</Link>
        </nav>
        <div className="admin-user-info">
          <span>{user?.name}</span>
          <button onClick={handleLogout} className="admin-logout-btn">Logout</button>
        </div>
      </aside>
      <main className="admin-main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
