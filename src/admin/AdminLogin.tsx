import { useState } from 'react';
import { login, setToken } from '../api/client';

export default function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await login(username, password);
      setToken(res.token);
      onLogin();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-green-500/20 bg-green-500/5 mb-4">
            <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="font-mono text-xl text-green-500 uppercase tracking-wider">Admin</h1>
          <p className="font-mono text-xs text-gray-600 mt-1">portfolio@ykrishhh</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" aria-label="Admin login form">
          <div>
            <label htmlFor="login-username" className="sr-only">Username</label>
            <input
              id="login-username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => { setUsername(e.target.value); if (error) setError(''); }}
              autoComplete="username"
              autoFocus
              className="w-full px-4 py-2.5 rounded bg-black border border-[#1a1a1a] font-mono text-sm text-gray-300 placeholder-gray-700 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/30 transition-all duration-200"
            />
          </div>
          <div>
            <label htmlFor="login-password" className="sr-only">Password</label>
            <input
              id="login-password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => { setPassword(e.target.value); if (error) setError(''); }}
              autoComplete="current-password"
              className="w-full px-4 py-2.5 rounded bg-black border border-[#1a1a1a] font-mono text-sm text-gray-300 placeholder-gray-700 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/30 transition-all duration-200"
            />
          </div>

          {error && (
            <div className="border-l-[3px] border-l-red-500 pl-3" role="alert">
              <p className="text-xs text-red-400 font-mono">{error}</p>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="btn-layer relative w-full px-6 py-2.5 font-mono text-xs uppercase tracking-wider rounded font-bold text-green-500 hover:bg-green-500/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
            >
              {loading && (
                <span className="w-3 h-3 border border-green-500/40 border-t-green-500 rounded-full animate-spin" aria-hidden="true" />
              )}
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <a href="/" className="font-mono text-xs text-gray-700 hover:text-green-500/80 transition-colors duration-200">
            &larr; Back to portfolio
          </a>
        </div>
      </div>
    </div>
  );
}
