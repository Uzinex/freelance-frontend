import { useState } from 'react';
import { authApi } from '../api/authApi';

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', phone: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await authApi.register(form);
      alert('Registration successful');
    } catch {
      setError('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="username"
        value={form.username}
        onChange={handleChange}
        placeholder="Username"
        className="border p-2 w-full"
      />
      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className="border p-2 w-full"
      />
      <input
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="Phone"
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
      {error && <div className="text-red-500">{error}</div>}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2" disabled={loading}>
        {loading ? 'Loading...' : 'Register'}
      </button>
    </form>
  );
}
