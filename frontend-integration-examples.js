// Frontend Integration Examples for React
// These examples show how to integrate the backend APIs with your React frontend

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
    const data = await apiCall('/users/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
    
    if (data.success) {
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('user', JSON.stringify(data.data.user));
    }
    
    return data;
  },

  login: async (credentials) => {
    const data = await apiCall('/users/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
    
    if (data.success) {
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('user', JSON.stringify(data.data.user));
    }
    
    return data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getProfile: () => apiCall('/users/profile'),

  updateProfile: (profileData) => apiCall('/users/profile', {
    method: 'PUT',
    body: JSON.stringify(profileData)
  }),

  changePassword: (passwordData) => apiCall('/users/change-password', {
    method: 'PUT',
    body: JSON.stringify(passwordData)
  })
};

// PRODUCT API CALLS
export const productAPI = {
  getProducts: (filters = {}) => {
    const queryParams = new URLSearchParams(filters);
    return apiCall(`/products?${queryParams}`);
  },

  getProduct: (id) => apiCall(`/products/${id}`),

  getCategories: () => apiCall('/products/categories'),

  getProductsByCategory: (category, page = 1) => 
    apiCall(`/products/category/${category}?page=${page}`),

  searchProducts: (query, page = 1) => 
    apiCall(`/products/search?query=${encodeURIComponent(query)}&page=${page}`),

  addReview: (productId, reviewData) => apiCall(`/products/${productId}/reviews`, {
    method: 'POST',
    body: JSON.stringify(reviewData)
  })
};

// CART API CALLS
export const cartAPI = {
  getCart: () => apiCall('/cart'),

  addToCart: (productId, quantity = 1) => apiCall('/cart/add', {
    method: 'POST',
    body: JSON.stringify({ productId, quantity })
  }),

  updateCartItem: (productId, quantity) => apiCall('/cart/update', {
    method: 'PUT',
    body: JSON.stringify({ productId, quantity })
  }),

  removeFromCart: (productId) => apiCall(`/cart/remove/${productId}`, {
    method: 'DELETE'
  }),

  clearCart: () => apiCall('/cart/clear', {
    method: 'DELETE'
  })
};

// ORDER API CALLS
export const orderAPI = {
  createOrder: (orderData) => apiCall('/orders', {
    method: 'POST',
    body: JSON.stringify(orderData)
  }),

  getOrders: (page = 1) => apiCall(`/orders?page=${page}`),

  getOrder: (id) => apiCall(`/orders/${id}`),

  cancelOrder: (id, cancelReason) => apiCall(`/orders/${id}/cancel`, {
    method: 'PUT',
    body: JSON.stringify({ cancelReason })
  }),

  processPayment: (orderId, paymentDetails) => apiCall('/orders/payment', {
    method: 'POST',
    body: JSON.stringify({ orderId, paymentDetails })
  })
};

// FEEDBACK API CALLS
export const feedbackAPI = {
  createFeedback: (feedbackData) => apiCall('/feedback', {
    method: 'POST',
    body: JSON.stringify(feedbackData)
  }),

  getFeedback: (page = 1) => apiCall(`/feedback?page=${page}`),

  getFeedbackById: (id) => apiCall(`/feedback/${id}`),

  updateFeedback: (id, feedbackData) => apiCall(`/feedback/${id}`, {
    method: 'PUT',
    body: JSON.stringify(feedbackData)
  }),

  deleteFeedback: (id) => apiCall(`/feedback/${id}`, {
    method: 'DELETE'
  })
};

// ADMIN API CALLS (for admin users only)
export const adminAPI = {
  getDashboard: () => apiCall('/admin/dashboard'),

  // User Management
  getUsers: (page = 1, search = '') => 
    apiCall(`/admin/users?page=${page}&search=${encodeURIComponent(search)}`),

  toggleUserStatus: (userId) => apiCall(`/admin/users/${userId}/toggle-status`, {
    method: 'PUT'
  }),

  // Product Management
  getAdminProducts: (page = 1, search = '') => 
    apiCall(`/admin/products?page=${page}&search=${encodeURIComponent(search)}`),

  createProduct: (productData) => apiCall('/admin/products', {
    method: 'POST',
    body: JSON.stringify(productData)
  }),

  updateProduct: (id, productData) => apiCall(`/admin/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(productData)
  }),

  deleteProduct: (id) => apiCall(`/admin/products/${id}`, {
    method: 'DELETE'
  }),

  // Order Management
  getAdminOrders: (page = 1, status = '') => 
    apiCall(`/admin/orders?page=${page}&status=${status}`),

  updateOrderStatus: (id, statusData) => apiCall(`/admin/orders/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify(statusData)
  }),

  // Feedback Management
  getAdminFeedback: (page = 1, status = '', type = '') => 
    apiCall(`/admin/feedback?page=${page}&status=${status}&type=${type}`),

  respondToFeedback: (id, responseData) => apiCall(`/admin/feedback/${id}/respond`, {
    method: 'POST',
    body: JSON.stringify(responseData)
  })
};

// REACT HOOKS EXAMPLES

// Custom hook for authentication
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getAuthToken();
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const result = await authAPI.login(credentials);
      setUser(result.data.user);
      return result;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    authAPI.logout();
    setUser(null);
  };

  return { user, loading, login, logout };
};

// Custom hook for cart management
export const useCart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const result = await cartAPI.getCart();
      setCart(result.data.cart);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity) => {
    try {
      const result = await cartAPI.addToCart(productId, quantity);
      setCart(result.data.cart);
      return result;
    } catch (error) {
      throw error;
    }
  };

  const updateCart = async (productId, quantity) => {
    try {
      const result = await cartAPI.updateCartItem(productId, quantity);
      setCart(result.data.cart);
      return result;
    } catch (error) {
      throw error;
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const result = await cartAPI.removeFromCart(productId);
      setCart(result.data.cart);
      return result;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      fetchCart();
    }
  }, []);

  return {
    cart,
    loading,
    addToCart,
    updateCart,
    removeFromCart,
    fetchCart
  };
};

// COMPONENT EXAMPLES

// Product listing component
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const result = await productAPI.getProducts(filters);
        setProducts(result.data.products);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters]);

  if (loading) return <div>Loading products...</div>;

  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

// Order placement component
const OrderForm = () => {
  const [orderData, setOrderData] = useState({
    shippingAddress: {},
    paymentMethod: 'card'
  });
  const { cart } = useCart();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await orderAPI.createOrder({
        items: cart.map(item => ({
          product: item.product._id,
          quantity: item.quantity
        })),
        ...orderData
      });
      
      console.log('Order created:', result.data.order);
      // Redirect to payment or success page
    } catch (error) {
      console.error('Order creation failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Order form fields */}
      <button type="submit">Place Order</button>
    </form>
  );
};
