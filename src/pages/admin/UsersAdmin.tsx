import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminApi } from '../../api/adminApi';
import type { User } from '../../api/adminApi';
import { useAuthStore } from '../../store/authStore';

export default function UsersAdmin() {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();
  const role = useAuthStore((state) => state.role);

  useEffect(() => {
    if (role !== 'admin') {
      navigate('/');
      return;
    }
    adminApi.getAllUsers().then(setUsers);
  }, [role, navigate]);

  const handleBan = async (id: number) => {
    await adminApi.banUser(id);
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <table className="min-w-full border">
      <thead>
        <tr>
          <th className="border px-2">ID</th>
          <th className="border px-2">Username</th>
          <th className="border px-2">Email</th>
          <th className="border px-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td className="border px-2">{user.id}</td>
            <td className="border px-2">{user.username}</td>
            <td className="border px-2">{user.email}</td>
            <td className="border px-2">
              {user.isActive && (
                <button
                  onClick={() => handleBan(user.id)}
                  className="bg-red-500 text-white px-2 py-1"
                >
                  Забанить
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
