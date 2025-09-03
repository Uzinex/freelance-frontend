import { gql } from '@apollo/client';
import { client } from './projectsApi';

export interface Notification {
  id: number;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export const LIST_NOTIFICATIONS = gql`
  query ListNotifications {
    notifications {
      id
      type
      title
      message
      isRead
      createdAt
    }
  }
`;

export const MARK_NOTIFICATION_READ = gql`
  mutation MarkNotificationRead($id: Int!) {
    markNotificationRead(id: $id) {
      id
      isRead
    }
  }
`;

export const notificationsApi = {
  listNotifications: async () => {
    const { data } = await client.query<{ notifications: Notification[] }>({
      query: LIST_NOTIFICATIONS,
    });
    return data!.notifications;
  },
  markNotificationRead: async (id: number) => {
    const { data } = await client.mutate<{ markNotificationRead: Notification }>({
      mutation: MARK_NOTIFICATION_READ,
      variables: { id },
    });
    return data!.markNotificationRead;
  },
};

