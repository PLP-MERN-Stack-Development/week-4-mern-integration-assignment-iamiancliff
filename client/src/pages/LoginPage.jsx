// LoginPage.jsx - Handles user login with form submission and redirection
import { useState } from 'react';
import { Button } from '../components/ui/button';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await api.post('/posts/login', credentials);
      login(response.data.token);
      navigate('/dashboard'); // Redirect to dashboard after login
    } catch (err) {
      setError('Login failed. Check credentials or server.');
    }
  };

  return (
    <div className="container mx-auto p-6 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-3xl font-bold text-primary text-center">Login</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            placeholder="Username"
            className="w-full p-2 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            placeholder="Password"
            className="w-full p-2 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Button type="submit" className="w-full bg-primary text-white hover:bg-accent">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;