import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Signup() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await register(formData);
      if (data.success) {
        navigate('/'); // Redirect to home on successful registration
      } else {
        setError(data.message || 'Signup failed.');
      }
    } catch (err) {
      setError(err.message || 'An error occurred during signup.');
    }
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 login-form">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white login-title">
            Snap It
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 login-con">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white login-font">
                Create an account
              </h1>
              {error && <p className="text-sm font-light text-red-400">{error}</p>}
              <form className="space-y-4 md:space-y-6" onSubmit={handleSignup}>
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white login-font">Your Name</label>
                  <input type="text" name="name" id="name" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5" placeholder="John Doe" required />
                </div>
                <div>
                  <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white login-font">Username</label>
                  <input type="text" name="username" id="username" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5" placeholder="johndoe" required />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white login-font">Your Email</label>
                  <input type="email" name="email" id="email" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5" placeholder="name@company.com" required />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white login-font">Password</label>
                  <input type="password" name="password" id="password" onChange={handleChange} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5" required />
                </div>
                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 login-btn btn-font">Sign up</button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400 login-font">
                  Already have an account? <a href="#" onClick={() => navigate('/login')} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Signup;
