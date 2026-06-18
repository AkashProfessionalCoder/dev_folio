import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import api from '../services/api';
import toast from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();

  const [debugData, setDebugData] = useState(null);
  const [showDebug, setShowDebug] = useState(false);
  const [debugLoading, setDebugLoading] = useState(false);

  const fetchDebugInfo = async () => {
    setDebugLoading(true);
    try {
      const { data } = await api.get('/auth/debug-env');
      setDebugData(data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to retrieve server environment debug info');
    } finally {
      setDebugLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      setAuth(data.user, data.token);
      navigate('/dashboard');
    } catch (err) {
      console.error("Login error details:", err.response?.data || err.message);
      const errorData = err.response?.data?.error;
      const errMsg = typeof errorData === 'object' && errorData !== null
        ? (errorData.message || JSON.stringify(errorData))
        : (errorData || err.response?.data?.message || 'Login failed');
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">
            <span className="text-brand-500">Dev</span>Folio Forge
          </h1>
          <p className="mt-2 text-gray-400">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-gray-800 bg-gray-900 p-8">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-white placeholder-gray-500 outline-none transition-colors focus:border-brand-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-white placeholder-gray-500 outline-none transition-colors focus:border-brand-500"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-brand-600 py-2.5 font-medium text-white transition-colors hover:bg-brand-700 disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <Link to="/register" className="text-brand-400 hover:text-brand-300">
            Create one
          </Link>
        </p>

        <div className="mt-8 border-t border-gray-800 pt-6 text-center">
          <button
            type="button"
            onClick={() => {
              if (!showDebug) {
                fetchDebugInfo();
              }
              setShowDebug(!showDebug);
            }}
            className="text-xs font-semibold uppercase tracking-wider text-gray-500 transition-colors hover:text-brand-400"
          >
            {showDebug ? 'Hide Live Environment Diagnostics' : 'Show Live Environment Diagnostics'}
          </button>

          {showDebug && (
            <div className="mt-4 rounded-xl border border-gray-800 bg-gray-950 p-4 text-left font-mono text-xs text-gray-400">
              <h3 className="mb-2 font-bold text-gray-300">Vercel Server Environment Check:</h3>
              {debugLoading ? (
                <p className="text-gray-600">Loading server environment variables...</p>
              ) : debugData ? (
                <div className="space-y-1.5">
                  <div>
                    <span className="text-gray-500">MONGODB_URI:</span>{' '}
                    <span className={debugData.MONGODB_URI === 'NOT FOUND' ? 'text-red-500 font-bold' : 'text-green-500'}>
                      {debugData.MONGODB_URI}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">JWT_SECRET:</span>{' '}
                    <span className={debugData.JWT_SECRET === 'NOT FOUND' ? 'text-red-500 font-bold' : 'text-green-500'}>
                      {debugData.JWT_SECRET}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">JWT_EXPIRES_IN:</span>{' '}
                    <span className="text-blue-400">{debugData.JWT_EXPIRES_IN}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">CLIENT_URL:</span>{' '}
                    <span className="text-blue-400">{debugData.CLIENT_URL}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">NODE_ENV:</span>{' '}
                    <span className="text-purple-400">{debugData.NODE_ENV}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">VERCEL:</span>{' '}
                    <span className="text-purple-400">{debugData.VERCEL}</span>
                  </div>
                </div>
              ) : (
                <p className="text-red-500">Could not connect to the backend API diagnostic endpoint.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
