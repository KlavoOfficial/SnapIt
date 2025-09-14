import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function AdminLogin() {
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await login({ loginIdentifier, password });
      if (data.success && data.data.user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        // Use the error from the backend if available, otherwise a generic one
        setError(data.message || 'Access denied. Not an admin user or invalid credentials.');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center p-4">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold">Snap It Admin</h1>
      </div>
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Sign In</h2>
        
        {error && 
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-md p-3 mb-6 text-center" role="alert">
            {error}
          </div>
        }

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="loginIdentifier" className="block text-sm font-medium text-gray-400 mb-2">Username</label>
            <input
              id="loginIdentifier"
              name="loginIdentifier"
              type="text"
              value={loginIdentifier}
              onChange={(e) => setLoginIdentifier(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
              placeholder="admin"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-2">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
              placeholder="••••••••"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-yellow-500 text-gray-900 font-bold py-2.5 px-4 rounded-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-yellow-500 transition-colors duration-200"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
