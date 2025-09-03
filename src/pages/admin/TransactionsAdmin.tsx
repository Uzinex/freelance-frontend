import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminApi } from '../../api/adminApi';
import type { Transaction } from '../../api/adminApi';
import { useAuthStore } from '../../store/authStore';

export default function TransactionsAdmin() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const navigate = useNavigate();
  const role = useAuthStore((state) => state.role);

  useEffect(() => {
    if (role !== 'admin') {
      navigate('/');
      return;
    }
    adminApi.getAllTransactions().then(setTransactions);
  }, [role, navigate]);

  return (
    <table className="min-w-full border">
      <thead>
        <tr>
          <th className="border px-2">ID</th>
          <th className="border px-2">Amount</th>
          <th className="border px-2">Type</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((t) => (
          <tr key={t.id}>
            <td className="border px-2">{t.id}</td>
            <td className="border px-2">{t.amount}</td>
            <td className="border px-2">{t.type}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
