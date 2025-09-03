import { useState } from 'react';
import { authApi } from '../api/authApi';

export default function ResetPasswordRequest() {
  const [identifier, setIdentifier] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authApi.requestPasswordReset(identifier);
      setMessage('Reset code sent');
      setError('');
    } catch {
      setError('Request failed');
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
        placeholder="Email or Phone"
        className="border p-2 w-full"
      />
      {message && <div className="text-green-600">{message}</div>}
      {error && <div className="text-red-500">{error}</div>}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Request Reset
      </button>
    </form>
  );
}
