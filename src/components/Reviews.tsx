import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { LIST_REVIEWS, CREATE_REVIEW, type Review } from '../api/reviewsApi';

interface ReviewsProps {
  userId: number;
  projectId?: number;
  canReview: boolean;
}

export default function Reviews({ userId, projectId, canReview }: ReviewsProps) {
  const { data, refetch } = useQuery(LIST_REVIEWS, { variables: { userId } });
  const [createReview] = useMutation(CREATE_REVIEW);

  const [form, setForm] = useState({ rating: 5, comment: '' });
  const [error, setError] = useState('');

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!projectId) return;
    try {
      await createReview({
        variables: {
          projectId,
          rating: Number(form.rating),
          comment: form.comment,
        },
      });
      setForm({ rating: 5, comment: '' });
      setError('');
      refetch();
    } catch {
      setError('Failed to submit review');
    }
  };

  return (
    <div className="space-y-4">
      {canReview && (
        <form onSubmit={handleSubmit} className="space-y-2">
          <select
            name="rating"
            value={form.rating}
            onChange={handleChange}
            className="border p-2 w-full"
          >
            {[1, 2, 3, 4, 5].map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          <textarea
            name="comment"
            value={form.comment}
            onChange={handleChange}
            placeholder="Comment"
            className="border p-2 w-full"
          />
          {error && <div className="text-red-500">{error}</div>}
          <button type="submit" className="bg-blue-500 text-white px-4 py-2">
            Submit Review
          </button>
        </form>
      )}

      <div className="space-y-2">
        {data?.reviews?.map((review: Review) => (
          <div key={review.id} className="border p-2">
            <p className="font-semibold">{review.author.username}</p>
            <p>Rating: {review.rating}</p>
            {review.comment && <p>{review.comment}</p>}
            <p className="text-sm text-gray-500">
              {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

