import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from "./components/Navbar";
import HomePage from './pages/HomePage';
import Login from './components/Login';
import Signup from './components/Signup';
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
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <>
      {!isAuthPage && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
    </>
  );
}

// Component for the admin panel routes
function AdminPanel() {
  return (
    <AdminLayout>
      <Routes>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<div className="text-white text-center text-2xl mt-10">User Management Coming Soon</div>} />
        <Route path="products" element={<div className="text-white text-center text-2xl mt-10">Product Management Coming Soon</div>} />
        <Route path="orders" element={<div className="text-white text-center text-2xl mt-10">Order Management Coming Soon</div>} />
        <Route path="feedback" element={<div className="text-white text-center text-2xl mt-10">Feedback Management Coming Soon</div>} />
      </Routes>
    </AdminLayout>
  );
}

export default App;
