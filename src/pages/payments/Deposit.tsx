import { useState } from 'react';
import { paymentGatewayApi } from '../../api/paymentGatewayApi';

export default function Deposit() {
  const [amount, setAmount] = useState('');
  const [provider, setProvider] = useState('click');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = parseFloat(amount);
    if (!value) return;
    setLoading(true);
    paymentGatewayApi
      .initiatePayment(provider, value)
      .then((url) => {
        alert('Redirecting to payment provider...');
        window.location.href = url;
      })
      .catch(() => {
        alert('Failed to initiate payment');
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
      <div>
        <label className="block">Provider</label>
        <select
          className="border p-2 w-full"
          value={provider}
          onChange={(e) => setProvider(e.target.value)}
        >
          <option value="click">Click</option>
          <option value="payme">Payme</option>
          <option value="stripe">Stripe</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2"
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Pay'}
      </button>
    </form>
  );
}
