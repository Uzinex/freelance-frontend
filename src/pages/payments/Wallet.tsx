import { useEffect, useState } from 'react';
import { paymentsApi, type Wallet as WalletType } from '../../api/paymentsApi';

export default function Wallet() {
  const [wallet, setWallet] = useState<WalletType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    paymentsApi
      .getWallet()
      .then((w) => setWallet(w))
      .catch(() => setError('Failed to load wallet'))
      .finally(() => setLoading(false));
  }, []);

  const handleDeposit = async () => {
    const amountStr = prompt('Введите сумму для пополнения:');
    const amount = parseFloat(amountStr || '');
    if (!amount) return;
    const updated = await paymentsApi.deposit(amount);
    setWallet(updated);
  };

  const handleWithdraw = async () => {
    const amountStr = prompt('Введите сумму для вывода:');
    const amount = parseFloat(amountStr || '');
    if (!amount) return;
    const updated = await paymentsApi.withdraw(amount);
    setWallet(updated);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-4">
      <div>Баланс: {wallet?.balance}</div>
      <div className="space-x-2">
        <button className="bg-green-500 text-white px-4 py-2" onClick={handleDeposit}>
          Пополнить
        </button>
        <button className="bg-yellow-500 text-white px-4 py-2" onClick={handleWithdraw}>
          Вывести
        </button>
      </div>
    </div>
  );
}

