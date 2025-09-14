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
    <nav className="bg-primary fixed w-full z-20 top-0 start-0 border-b border-primary-dark shadow-lg">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-black whitespace-nowrap text-secondary">Snap It</span>
        </Link>

        <div className="flex items-center md:order-2 space-x-2 md:space-x-3 rtl:space-x-reverse">
          {user ? (
            <>
              <span className="text-white hidden sm:inline">Hi, {user.name}</span>
              {user.role === 'admin' && (
                <button onClick={() => navigate('/admin/dashboard')} type="button" className="text-primary bg-white hover:bg-gray-200 font-bold rounded-lg text-sm px-4 py-2 text-center transition-colors">Admin Panel</button>
              )}
              <button onClick={handleLogout} type="button" className="text-deep-purple bg-secondary hover:bg-secondary-hover font-bold rounded-lg text-sm px-4 py-2 text-center transition-colors">Logout</button>
            </>
          ) : (
            <>
              <button onClick={() => navigate('/login')} type="button" className="text-white hover:bg-primary-dark font-medium rounded-lg text-sm px-4 py-2 text-center transition-colors">Sign in</button>
              <button onClick={() => navigate('/signup')} type="button" className="text-deep-purple bg-secondary hover:bg-secondary-hover font-bold rounded-lg text-sm px-4 py-2 text-center transition-colors">Register</button>
            </>
          )}
        </div>
        
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-700 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            <li><Link to="/" className="block py-2 px-3 text-white rounded md:bg-transparent md:p-0 hover:text-secondary transition-colors">Home</Link></li>
            <li><a href="#about" className="block py-2 px-3 text-white rounded md:p-0 hover:text-secondary transition-colors">About Us</a></li>
            <li><a href="#services" className="block py-2 px-3 text-white rounded md:p-0 hover:text-secondary transition-colors">Services</a></li>
            <li><a href="#products" className="block py-2 px-3 text-white rounded md:p-0 hover:text-secondary transition-colors">Products</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
