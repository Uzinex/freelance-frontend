import { useEffect, useState } from 'react';
import { paymentsApi, type Transaction } from '../../api/paymentsApi';
import {
  paymentGatewayApi,
  type PaymentGatewayTransactionType,
} from '../../api/paymentGatewayApi';

export default function Transactions() {
  const [items, setItems] = useState<Transaction[]>([]);
  const [gatewayItems, setGatewayItems] = useState<PaymentGatewayTransactionType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([
      paymentsApi.getTransactions(),
      paymentGatewayApi.getPaymentTransactions(),
    ])
      .then(([t, pg]) => {
        setItems(t);
        setGatewayItems(pg);
      })
      .catch(() => setError('Failed to load transactions'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-8">
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border px-2">Тип</th>
            <th className="border px-2">Сумма</th>
            <th className="border px-2">Статус</th>
            <th className="border px-2">Дата</th>
          </tr>
        </thead>
        <tbody>
          {items.map((t) => (
            <tr key={t.id}>
              <td className="border px-2">{t.type}</td>
              <td className="border px-2">{t.amount}</td>
              <td className="border px-2">{t.status}</td>
              <td className="border px-2">{new Date(t.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <table className="w-full border">
        <thead>
          <tr>
            <th className="border px-2">Провайдер</th>
            <th className="border px-2">Сумма</th>
            <th className="border px-2">Статус</th>
            <th className="border px-2">Дата</th>
          </tr>
        </thead>
        <tbody>
          {gatewayItems.map((t) => (
            <tr key={t.id}>
              <td className="border px-2">{t.provider}</td>
              <td className="border px-2">{t.amount}</td>
              <td className="border px-2">{t.status}</td>
              <td className="border px-2">{new Date(t.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
