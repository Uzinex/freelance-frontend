import { gql } from '@apollo/client';
import { client } from './projectsApi';

export interface Room {
  id: number;
  project?: { id: number; title: string } | null;
  participants: { id: number; username: string }[];
  createdAt: string;
}

export interface Message {
  id: number;
  room: { id: number };
  author: { id: number; username: string };
  content: string;
  createdAt: string;
}

export const LIST_ROOMS = gql`
  query ListRooms {
    rooms {
      id
      project {
        id
        title
      }
      participants {
        id
        username
      }
      createdAt
    }
  }
`;

export const LIST_MESSAGES = gql`
  query ListMessages($roomId: Int!) {
    messages(roomId: $roomId) {
      id
      room {
        id
      }
      author {
        id
        username
      }
      content
      createdAt
    }
  }
`;

export const CREATE_ROOM = gql`
  mutation CreateRoom($projectId: Int, $participants: [Int!]!) {
    createRoom(projectId: $projectId, participants: $participants) {
      id
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation SendMessage($roomId: Int!, $content: String!) {
    sendMessage(roomId: $roomId, content: $content) {
      id
      room {
        id
      }
      author {
        id
        username
      }
      content
      createdAt
    }
  }
`;

export const chatApi = {
  listRooms: async () => {
    const { data } = await client.query<{ rooms: Room[] }>({
      query: LIST_ROOMS,
    });
    return data!.rooms;
  },
  listMessages: async (roomId: number) => {
    const { data } = await client.query<{ messages: Message[] }>({
      query: LIST_MESSAGES,
      variables: { roomId },
    });
    return data!.messages;
  },
  createRoom: async (projectId: number | null, participants: number[]) => {
    const { data } = await client.mutate<{ createRoom: Room }>({
      mutation: CREATE_ROOM,
      variables: { projectId, participants },
    });
    return data!.createRoom;
  },
  sendMessage: async (roomId: number, content: string) => {
    const { data } = await client.mutate<{ sendMessage: Message }>({
      mutation: SEND_MESSAGE,
      variables: { roomId, content },
    });
    return data!.sendMessage;
  },
};

