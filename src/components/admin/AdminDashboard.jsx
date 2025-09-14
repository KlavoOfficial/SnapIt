import React, { useEffect, useState } from 'react';
import { adminAPI } from '../../utils/api';

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await adminAPI.getDashboard();
        if (response.success) {
          setStats(response.data);
        } else {
          setError('Failed to load dashboard data.');
        }
      } catch (err) {
        setError(err.message || 'An error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="text-white">Loading Dashboard...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Admin Dashboard</h1>
      
      {stats && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="admin-stat-card">
              <h3 className="text-lg font-semibold">Total Users</h3>
              <p className="text-3xl font-bold">{stats.stats.totalUsers}</p>
            </div>
            <div className="admin-stat-card">
              <h3 className="text-lg font-semibold">Total Products</h3>
              <p className="text-3xl font-bold">{stats.stats.totalProducts}</p>
            </div>
            <div className="admin-stat-card">
              <h3 className="text-lg font-semibold">Total Orders</h3>
              <p className="text-3xl font-bold">{stats.stats.totalOrders}</p>
            </div>
            <div className="admin-stat-card">
              <h3 className="text-lg font-semibold">Weekly Revenue</h3>
              <p className="text-3xl font-bold">${stats.stats.weeklyRevenue.toFixed(2)}</p>
            </div>
          </div>

          <div className="admin-card">
            <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="admin-th">Order #</th>
                    <th className="admin-th">User</th>
                    <th className="admin-th">Date</th>
                    <th className="admin-th">Total</th>
                    <th className="admin-th">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentOrders.map(order => (
                    <tr key={order._id} className="admin-tr">
                      <td className="admin-td">{order.orderNumber}</td>
                      <td className="admin-td">{order.user.name}</td>
                      <td className="admin-td">{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td className="admin-td">${order.total.toFixed(2)}</td>
                      <td className="admin-td">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold status-${order.orderStatus}`}>
                          {order.orderStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AdminDashboard;
