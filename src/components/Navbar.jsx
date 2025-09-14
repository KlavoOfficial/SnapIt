import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 navbar">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white logo-name">Snap It</span>
          </Link>

          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {user ? (
              <>
                <span className="text-white mr-4">Hi, {user.name}</span>
                <button onClick={handleLogout} type="button" className="nav-btn py-2.5 px-5 text-sm font-medium">Logout</button>
                {user.role === 'admin' && (
                  <button onClick={() => navigate('/admin/dashboard')} type="button" className="nav-btn py-2.5 px-5 ml-2 text-sm font-medium">Admin Panel</button>
                )}
              </>
            ) : (
              <>
                <button onClick={() => navigate('/login')} type="button" className="nav-btn py-2.5 px-5 text-sm font-medium">Sign in</button>
                <button onClick={() => navigate('/signup')} type="button" className="nav-btn py-2.5 px-5 ml-2 text-sm font-medium">Register</button>
              </>
            )}
          </div>
          
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border navbar-menu border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900">
              <li><Link to="/" className="block py-2 px-3 text-white rounded-sm md:bg-transparent md:p-0">Home</Link></li>
              <li><a href="#services" className="block py-2 px-3 text-white rounded-sm md:p-0">Services</a></li>
              <li><a href="#about" className="block py-2 px-3 text-white rounded-sm md:p-0">About Us</a></li>
              <li><a href="#products" className="block py-2 px-3 text-white rounded-sm md:p-0">Products</a></li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
