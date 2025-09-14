// API Base URL
const API_BASE_URL = 'http://localhost:5000/api';

// Utility function to get auth token
const getAuthToken = () => localStorage.getItem('token');

// Utility function for API calls
const apiCall = async (endpoint, options = {}) => {
  const token = getAuthToken();
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'API call failed');
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// AUTH API CALLS
export const authAPI = {
  register: async (userData) => {
    return await apiCall('/users/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  },

  login: async (credentials) => {
    return await apiCall('/users/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  },

  getProfile: () => apiCall('/users/profile'),
};

// ADMIN API CALLS
export const adminAPI = {
  getDashboard: () => apiCall('/admin/dashboard'),
};
