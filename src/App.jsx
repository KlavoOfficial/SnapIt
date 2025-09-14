import { Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Main from "./components/Main2";
import ProductList from './components/ProductList';
import Rating from './components/Rating';
import Login from './components/Login';
import Signup from './components/Signup';
import About from "./components/About";
import AdminLogin from './components/admin/AdminLogin';
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './components/admin/AdminDashboard';

function App() {
  return (
    <>
      <Routes>
        {/* Public Website Routes */}
        <Route path="/*" element={<MainWebsite />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin/*" element={<AdminPanel />} />
        </Route>
      </Routes>
    </>
  );
}

// Component for the main public-facing website
function MainWebsite() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <Main />
            <ProductList />
            <Rating />
            <About />
          </>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

// Component for the admin panel routes
function AdminPanel() {
  return (
    <AdminLayout>
      <Routes>
        <Route path="dashboard" element={<AdminDashboard />} />
        {/* Add other admin routes here as they are built */}
        <Route path="users" element={<div className="text-white">User Management Coming Soon</div>} />
        <Route path="products" element={<div className="text-white">Product Management Coming Soon</div>} />
        <Route path="orders" element={<div className="text-white">Order Management Coming Soon</div>} />
        <Route path="feedback" element={<div className="text-white">Feedback Management Coming Soon</div>} />
      </Routes>
    </AdminLayout>
  );
}

export default App;
