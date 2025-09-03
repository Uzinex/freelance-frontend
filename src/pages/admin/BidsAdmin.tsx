import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminApi } from '../../api/adminApi';
import type { Bid } from '../../api/adminApi';
import { useAuthStore } from '../../store/authStore';

export default function BidsAdmin() {
  const [bids, setBids] = useState<Bid[]>([]);
  const navigate = useNavigate();
  const role = useAuthStore((state) => state.role);

  useEffect(() => {
    if (role !== 'admin') {
      navigate('/');
      return;
    }
    adminApi.getAllBids().then(setBids);
  }, [role, navigate]);

  const handleResolve = async (id: number) => {
    await adminApi.resolveDispute(id);
    setBids((prev) => prev.map((b) => (b.id === id ? { ...b, status: 'resolved' } : b)));
  };

  return (
    <table className="min-w-full border">
      <thead>
        <tr>
          <th className="border px-2">ID</th>
          <th className="border px-2">Amount</th>
          <th className="border px-2">Status</th>
          <th className="border px-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {bids.map((b) => (
          <tr key={b.id}>
            <td className="border px-2">{b.id}</td>
            <td className="border px-2">{b.amount}</td>
            <td className="border px-2">{b.status}</td>
            <td className="border px-2">
              <button
                onClick={() => handleResolve(b.id)}
                className="bg-green-500 text-white px-2 py-1"
              >
                Resolve dispute
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
