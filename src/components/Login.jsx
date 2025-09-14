import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await login({ loginIdentifier, password });
      if (data.success) {
        navigate('/'); // Redirect to home page after successful login
      } else {
        setError(data.message || 'Login failed.');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <section className="bg-deep-purple min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md mx-auto p-4">
          <Link to="/" className="flex justify-center items-center mb-6 text-4xl font-black text-secondary">
              Snap It   
          </Link>
          <div className="w-full bg-primary rounded-2xl shadow-2xl p-8">
              <div className="space-y-6">
                  <h1 className="text-2xl font-bold text-center text-white">
                      Sign in to your account
                  </h1>
                  {error && <p className="text-center text-sm font-light text-red-400">{error}</p>}
                  <form className="space-y-6" onSubmit={handleLogin}>
                      <div>
                          <label htmlFor="loginIdentifier" className="block mb-2 text-sm font-medium text-white/80">Username or Email</label>
                          <input type="text" name="loginIdentifier" id="loginIdentifier" value={loginIdentifier} onChange={(e) => setLoginIdentifier(e.target.value)} className="bg-primary-dark border border-purple-600 text-white rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5" placeholder="your_username or name@company.com" required/>
                      </div>
                      <div>
                          <label htmlFor="password" className="block mb-2 text-sm font-medium text-white/80">Password</label>
                          <input type="password" name="password" id="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-primary-dark border border-purple-600 text-white rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5" required/>
                      </div>
                      <button type="submit" className="w-full text-deep-purple bg-secondary hover:bg-secondary-hover focus:ring-4 focus:outline-none focus:ring-yellow-300 font-bold rounded-lg text-sm px-5 py-3 text-center transition-transform hover:scale-105">Sign in</button>
                      <p className="text-sm font-light text-center text-white/60">
                          Don’t have an account yet? <Link to="/signup" className="font-medium text-secondary hover:underline">Sign up</Link>
                      </p>  
                  </form>
              </div>
          </div>
      </div>
    </section>
  )
}

export default Login;
