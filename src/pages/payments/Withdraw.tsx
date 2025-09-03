import { useState } from 'react';
import { paymentGatewayApi } from '../../api/paymentGatewayApi';

export default function Withdraw() {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = parseFloat(amount);
    if (!value) return;
    setLoading(true);
    paymentGatewayApi
      .withdraw(value)
      .then(() => {
        alert('Withdrawal successful');
      })
      .catch(() => {
        alert('Withdrawal failed');
      })
      .finally(() => setLoading(false));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block">Amount</label>
        <input
          type="number"
          className="border p-2 w-full"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="bg-yellow-500 text-white px-4 py-2"
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Withdraw'}
      </button>
    </form>
  );
}
