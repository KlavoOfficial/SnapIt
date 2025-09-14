import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
    <section className="bg-secondary min-h-screen flex items-center justify-center py-8">
      <div className="w-full max-w-md mx-auto p-4">
        <Link to="/" className="flex justify-center items-center mb-6 text-4xl font-black text-primary">
          Snap It
        </Link>
        <div className="w-full bg-primary rounded-2xl shadow-2xl p-8">
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-center text-white">
              Create an account
            </h1>
            {error && <p className="text-center text-sm font-light text-red-400">{error}</p>}
            <form className="space-y-4" onSubmit={handleSignup}>
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-white/80">Your Name</label>
                <input type="text" name="name" id="name" onChange={handleChange} className="bg-purple-700 border border-purple-600 text-white rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5" placeholder="John Doe" required />
              </div>
              <div>
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-white/80">Username</label>
                <input type="text" name="username" id="username" onChange={handleChange} className="bg-purple-700 border border-purple-600 text-white rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5" placeholder="johndoe" required />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-white/80">Your Email</label>
                <input type="email" name="email" id="email" onChange={handleChange} className="bg-purple-700 border border-purple-600 text-white rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5" placeholder="name@company.com" required />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-white/80">Password</label>
                <input type="password" name="password" id="password" onChange={handleChange} placeholder="••••••••" className="bg-purple-700 border border-purple-600 text-white rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5" required />
              </div>
              <button type="submit" className="w-full text-primary bg-secondary hover:bg-secondary-hover focus:ring-4 focus:outline-none focus:ring-yellow-300 font-bold rounded-lg text-sm px-5 py-3 text-center transition-transform hover:scale-105">Sign up</button>
              <p className="text-sm font-light text-center text-white/60">
                Already have an account? <Link to="/login" className="font-medium text-secondary hover:underline">Sign in</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;
