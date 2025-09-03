import { create } from 'zustand';
import { notificationsApi, type Notification } from '../api/notificationsApi';

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
      notifications: state.notifications.map((n: Notification) =>
        n.id === id ? { ...n, isRead: true } : n,
      ),
    }));
  },
  addNotification: (n: Notification) =>
    set((state) => ({ notifications: [n, ...state.notifications] })),
}));

