import { useState } from 'react';
import { authApi } from '../api/authApi';

export default function ResetPasswordConfirm() {
  const [form, setForm] = useState({ identifier: '', code: '', new_password: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authApi.confirmPasswordReset(form);
      setMessage('Password reset successful');
      setError('');
    } catch {
      setError('Reset failed');
      setMessage('');
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
        name="code"
        value={form.code}
        onChange={handleChange}
        placeholder="Code"
        className="border p-2 w-full"
      />
      <input
        name="new_password"
        type="password"
        value={form.new_password}
        onChange={handleChange}
        placeholder="New Password"
        className="border p-2 w-full"
      />
      {message && <div className="text-green-600">{message}</div>}
      {error && <div className="text-red-500">{error}</div>}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Reset Password
      </button>
    </form>
  );
}
