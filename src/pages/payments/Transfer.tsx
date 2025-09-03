import { useState } from 'react';
import { paymentsApi } from '../../api/paymentsApi';

export default function Transfer() {
  const [form, setForm] = useState({ toUserId: '', amount: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await paymentsApi.transfer(Number(form.toUserId), parseFloat(form.amount));
      setSuccess('Перевод выполнен');
      setError('');
      setForm({ toUserId: '', amount: '' });
    } catch {
      setError('Transfer failed');
      setSuccess('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="toUserId"
        value={form.toUserId}
        onChange={handleChange}
        placeholder="ID пользователя"
        className="border p-2 w-full"
      />
      <input
        name="amount"
        value={form.amount}
        onChange={handleChange}
        placeholder="Сумма"
        className="border p-2 w-full"
      />
      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-500">{success}</div>}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Отправить
      </button>
    </form>
  );
}

