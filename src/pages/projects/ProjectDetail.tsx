import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_PROJECT } from '../../api/projectsApi';
import {
  LIST_BIDS,
  CREATE_BID,
  ACCEPT_BID,
  REJECT_BID,
} from '../../api/bidsApi';
import { useAuthStore } from '../../store/authStore';
import Reviews from '../../components/Reviews';

interface Bid {
  id: number;
  amount: number;
  message: string;
  status: string;
  freelancer: {
    id: number;
    username: string;
  };
}

export default function ProjectDetail() {
  const { id } = useParams();
  const projectId = Number(id);
  const token = useAuthStore((state) => state.accessToken);

  let currentUserId: number | null = null;
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      currentUserId = payload.user_id;
    } catch {
      currentUserId = null;
    }
  }

  const {
    data: projectData,
    loading: projectLoading,
  } = useQuery(GET_PROJECT, {
    variables: { id: projectId },
  });

  const project = projectData?.project;
  const isOwner = project?.owner?.id === currentUserId;

  const {
    data: bidsData,
    refetch: refetchBids,
  } = useQuery(LIST_BIDS, {
    variables: { projectId },
    skip: !token,
  });

  const [acceptBidMutation] = useMutation(ACCEPT_BID);
  const [rejectBidMutation] = useMutation(REJECT_BID);
  const [createBidMutation] = useMutation(CREATE_BID);

  const [form, setForm] = useState({ amount: '', message: '' });

  if (projectLoading) return <div>Loading...</div>;
  if (!project) return <div>Project not found</div>;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleBidSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await createBidMutation({
      variables: {
        projectId,
        amount: parseFloat(form.amount),
        message: form.message,
      },
    });
    setForm({ amount: '', message: '' });
    refetchBids();
  };

  const handleAccept = async (bidId: number) => {
    await acceptBidMutation({ variables: { id: bidId } });
    refetchBids();
  };

  const handleReject = async (bidId: number) => {
    await rejectBidMutation({ variables: { id: bidId } });
    refetchBids();
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">{project.title}</h1>
      <p>{project.description}</p>
      <p>Owner: {project.owner.username}</p>
      <p>
        Budget: {project.budgetMin} - {project.budgetMax}
      </p>
      <p>Status: {project.status}</p>

      {isOwner ? (
        <div className="space-y-2">
          <h2 className="text-lg font-semibold mt-4">Bids</h2>
          {bidsData?.bids?.map((bid: Bid) => (
            <div key={bid.id} className="border p-2 space-y-1">
              <p>
                <span className="font-semibold">{bid.freelancer.username}</span> offered {bid.amount}
              </p>
              <p>{bid.message}</p>
              <p>Status: {bid.status}</p>
              {bid.status === 'pending' && (
                <div className="space-x-2">
                  <button
                    className="px-2 py-1 bg-green-500 text-white"
                    onClick={() => handleAccept(bid.id)}
                  >
                    Accept
                  </button>
                  <button
                    className="px-2 py-1 bg-red-500 text-white"
                    onClick={() => handleReject(bid.id)}
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : token ? (
        <>
          <form onSubmit={handleBidSubmit} className="space-y-2 mt-4">
            <h2 className="text-lg font-semibold">Leave a Bid</h2>
            <input
              name="amount"
              value={form.amount}
              onChange={handleChange}
              placeholder="Amount"
              className="border p-2 w-full"
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Message"
              className="border p-2 w-full"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2">
              Submit Bid
            </button>
          </form>

          {bidsData?.bids?.length ? (
            <div className="space-y-2">
              <h2 className="text-lg font-semibold mt-4">Your Bids</h2>
              {bidsData.bids.map((bid: Bid) => (
                <div key={bid.id} className="border p-2 space-y-1">
                  <p>Amount: {bid.amount}</p>
                  <p>{bid.message}</p>
                  <p>Status: {bid.status}</p>
                </div>
              ))}
            </div>
          ) : null}
        </>
      ) : (
        <div className="mt-4">
          <Link to="/login" className="text-blue-500 underline">
            Login to place a bid
          </Link>
        </div>
      )}

      {project.status === 'completed' && (
        <Reviews userId={project.owner.id} projectId={projectId} canReview={!!token} />
      )}
    </div>
  );
}
