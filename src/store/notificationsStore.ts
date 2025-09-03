import { create } from 'zustand';
import { Notification, notificationsApi } from '../api/notificationsApi';

interface NotificationsState {
  notifications: Notification[];
  loadNotifications: () => Promise<void>;
  markRead: (id: number) => Promise<void>;
  addNotification: (n: Notification) => void;
}

export const useNotificationsStore = create<NotificationsState>((set) => ({
  notifications: [],
  loadNotifications: async () => {
    const data = await notificationsApi.listNotifications();
    set({ notifications: data });
  },
  markRead: async (id: number) => {
    await notificationsApi.markNotificationRead(id);
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n,
      ),
    }));
  },
  addNotification: (n) =>
    set((state) => ({ notifications: [n, ...state.notifications] })),
}));

