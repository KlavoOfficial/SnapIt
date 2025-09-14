# SnapIt Grocery Store Backend

A complete Express.js backend for a grocery delivery application with user authentication, product management, order processing, and admin panel.

## Features

### User Features
- User registration and login with JWT authentication
- Browse product catalog with filtering and search
- Shopping cart management
- Order placement and tracking
- Feedback and review system
- Order history

### Admin Features
- Admin dashboard with analytics
- User management (activate/deactivate)
- Product CRUD operations
- Order management and status updates
- Feedback management and responses

### Technical Features
- MongoDB with Mongoose ODM
- JWT authentication
- Password hashing with bcrypt
- Input validation and sanitization
- Rate limiting and security headers
- CORS enabled for frontend integration
- Comprehensive error handling

## Installation

1. Install dependencies:
```bash
yarn install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Start MongoDB (make sure MongoDB is running on your system)

4. Seed the database with sample data:
```bash
node scripts/seedDatabase.js
```

5. Start the development server:
```bash
yarn dev
```

## API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Products
- `GET /api/products` - Get all products (with filtering)
- `GET /api/products/:id` - Get single product
- `GET /api/products/category/:category` - Get products by category
- `GET /api/products/search` - Search products
- `POST /api/products/:id/reviews` - Add product review

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item quantity
- `DELETE /api/cart/remove/:productId` - Remove item from cart

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get single order
- `PUT /api/orders/:id/cancel` - Cancel order
- `POST /api/orders/payment` - Process payment

### Feedback
- `POST /api/feedback` - Submit feedback
- `GET /api/feedback` - Get user's feedback
- `GET /api/feedback/:id` - Get single feedback
- `PUT /api/feedback/:id` - Update feedback
- `DELETE /api/feedback/:id` - Delete feedback

### Admin
- `GET /api/admin/dashboard` - Dashboard stats
- `GET /api/admin/users` - Manage users
- `GET /api/admin/products` - Manage products
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product
- `GET /api/admin/orders` - Manage orders
- `PUT /api/admin/orders/:id/status` - Update order status
- `GET /api/admin/feedback` - Manage feedback
- `POST /api/admin/feedback/:id/respond` - Respond to feedback

## Frontend Integration Examples

### User Registration
```javascript
const registerUser = async (userData) => {
  try {
    const response = await fetch('http://localhost:5000/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    });
    const data = await response.json();
    
    if (data.success) {
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('user', JSON.stringify(data.data.user));
    }
    
    return data;
  } catch (error) {
    console.error('Registration error:', error);
  }
};
```

### Fetch Products
```javascript
const fetchProducts = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams(filters);
    const response = await fetch(`http://localhost:5000/api/products?${queryParams}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch products error:', error);
  }
};
```

### Add to Cart
```javascript
const addToCart = async (productId, quantity) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:5000/api/cart/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ productId, quantity })
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Add to cart error:', error);
  }
};
```

### Create Order
```javascript
const createOrder = async (orderData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:5000/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(orderData)
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Create order error:', error);
  }
};
```

## Default Credentials

After seeding the database:

**Admin:**
- Email: admin@snapit.com
- Password: admin123

**Sample User:**
- Email: user@example.com
- Password: user123

## Project Structure

```
├── controllers/           # Route handlers
├── middleware/           # Custom middleware
├── models/              # Mongoose schemas
├── routes/              # API routes
├── scripts/             # Utility scripts
├── .env                 # Environment variables
├── server.js            # Main server file
└── README.md
```

## Environment Variables

Required environment variables in `.env`:

```
MONGODB_URI=mongodb://localhost:27017/grocery-store
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
ADMIN_EMAIL=admin@snapit.com
ADMIN_PASSWORD=admin123
PAYMENT_SUCCESS_RATE=0.8
```

## Development Scripts

```bash
# Start development server
yarn dev

# Seed database
node scripts/seedDatabase.js

# Start production server
yarn start
```

## Security Features

- JWT authentication
- Password hashing with bcrypt
- Rate limiting
- Input validation and sanitization
- CORS configuration
- Security headers with Helmet
- Error handling middleware

## Next Steps

1. Set up the backend server and database
2. Test API endpoints with Postman or similar tool
3. Integrate with your React frontend
4. Add file upload for product images
5. Implement email notifications
6. Add payment gateway integration
7. Deploy to production
