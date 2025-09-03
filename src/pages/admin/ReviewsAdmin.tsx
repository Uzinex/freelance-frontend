import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminApi } from '../../api/adminApi';
import type { Review } from '../../api/adminApi';
import { useAuthStore } from '../../store/authStore';

export default function ReviewsAdmin() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const navigate = useNavigate();
  const role = useAuthStore((state) => state.role);

  useEffect(() => {
    if (role !== 'admin') {
      navigate('/');
      return;
    }
    adminApi.getAllReviews().then(setReviews);
  }, [role, navigate]);

  const handleDelete = async (id: number) => {
    await adminApi.deleteReview(id);
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <table className="min-w-full border">
      <thead>
        <tr>
          <th className="border px-2">ID</th>
          <th className="border px-2">Rating</th>
          <th className="border px-2">Comment</th>
          <th className="border px-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {reviews.map((r) => (
          <tr key={r.id}>
            <td className="border px-2">{r.id}</td>
            <td className="border px-2">{r.rating}</td>
            <td className="border px-2">{r.comment}</td>
            <td className="border px-2">
              <button
                onClick={() => handleDelete(r.id)}
                className="bg-red-500 text-white px-2 py-1"
              >
                Удалить
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
