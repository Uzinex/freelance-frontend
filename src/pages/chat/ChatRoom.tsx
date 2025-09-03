import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { LIST_MESSAGES, type Message } from '../../api/chatApi';
import { wsClient } from '../../api/wsClient';
import { useChatStore } from '../../store/chatStore';

export default function ChatRoom() {
  const { roomId } = useParams();
  const numericId = Number(roomId);
  const { data, loading } = useQuery<{ messages: Message[] }>(LIST_MESSAGES, {
    variables: { roomId: numericId },
    skip: !roomId,
  });
  const messages = useChatStore((state) => state.messages);
  const setMessages = useChatStore((state) => state.setMessages);
  const setActiveRoom = useChatStore((state) => state.setActiveRoom);
  const [content, setContent] = useState('');

  useEffect(() => {
    if (data?.messages) {
      setMessages(data.messages);
    }
  }, [data, setMessages]);

  useEffect(() => {
    if (!numericId) return;
    setActiveRoom(numericId);
    wsClient.connect(numericId);
    return () => {
      wsClient.disconnect();
    };
  }, [numericId, setActiveRoom]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    wsClient.sendMessage(content);
    setContent('');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {messages.map((m: Message) => (
          <div key={m.id} className="border p-2">
            <strong>{m.author.username}:</strong> {m.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          className="flex-1 border p-2"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4" type="submit">
          Отправить
        </button>
      </form>
    </div>
  );
}
