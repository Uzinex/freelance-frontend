import { useEffect } from 'react';
import { useNotificationsStore } from '../store/notificationsStore';

export default function NotificationsList() {
  const notifications = useNotificationsStore((state) => state.notifications);
  const loadNotifications = useNotificationsStore((state) => state.loadNotifications);
  const markRead = useNotificationsStore((state) => state.markRead);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  if (!notifications.length) {
    return <div>No notifications</div>;
  }

  return (
    <div className="space-y-2">
      {notifications.map((n) => (
        <div key={n.id} className="border p-2">
          <div className="font-semibold">{n.title}</div>
          <div>{n.message}</div>
          <div className="text-sm text-gray-500">
            {new Date(n.createdAt).toLocaleString()}
          </div>
          {!n.isRead && (
            <button
              className="text-blue-500"
              onClick={() => markRead(n.id)}
            >
              Отметить как прочитанное
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

