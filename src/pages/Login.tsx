import { useState } from 'react';
import { authApi } from '../api/authApi';
import { useAuthStore } from '../store/authStore';

export default function Login() {
  const [form, setForm] = useState({ identifier: '', password: '', rememberMe: false });
  const login = useAuthStore((state) => state.login);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await authApi.login({ identifier: form.identifier, password: form.password });
      login({ accessToken: data.access, refreshToken: data.refresh, role: data.role });
    } catch (err: unknown) {
      const resp = err as { response?: { data?: { detail?: string } } };
      const message = resp.response?.data?.detail ?? 'Login failed';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="identifier"
        value={form.identifier}
        onChange={handleChange}
        placeholder="Email or Phone"
        className="border p-2 w-full"
      />
      <input
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
        className="border p-2 w-full"
      />
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="rememberMe"
          checked={form.rememberMe}
          onChange={handleChange}
        />
        <span>Remember me</span>
      </label>
      {error && <div className="text-red-500">{error}</div>}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2" disabled={loading}>
        {loading ? 'Loading...' : 'Login'}
      </button>
    </form>
  );
}
