import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { LIST_ROOMS, type Room } from '../../api/chatApi';

export default function ChatList() {
  const { data, loading } = useQuery<{ rooms: Room[] }>(LIST_ROOMS);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-xl mb-4">Чаты</h2>
      <ul className="space-y-2">
        {data?.rooms?.map((room: Room) => (
          <li key={room.id} className="border p-2">
            <Link to={`/chat/${room.id}`}>Комната {room.id}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
