import { gql } from '@apollo/client';
import { client } from './projectsApi';

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

export const LIST_BIDS = gql`
  query ListBids($projectId: Int!) {
    bids(projectId: $projectId) {
      id
      amount
      message
      status
      freelancer {
        id
        username
      }
    }
  }
`;

export const CREATE_BID = gql`
  mutation CreateBid($projectId: Int!, $amount: Float!, $message: String!) {
    createBid(projectId: $projectId, amount: $amount, message: $message) {
      id
      amount
      message
      status
      freelancer {
        id
        username
      }
    }
  }
`;

export const ACCEPT_BID = gql`
  mutation AcceptBid($id: Int!) {
    acceptBid(id: $id) {
      id
      status
    }
  }
`;

export const REJECT_BID = gql`
  mutation RejectBid($id: Int!) {
    rejectBid(id: $id) {
      id
      status
    }
  }
`;

export const bidsApi = {
  listBids: async (projectId: number) => {
    const { data } = await client.query<{ bids: Bid[] }>({
      query: LIST_BIDS,
      variables: { projectId },
    });
    return data!.bids;
  },
  createBid: async (projectId: number, amount: number, message: string) => {
    const { data } = await client.mutate<{ createBid: Bid }>({
      mutation: CREATE_BID,
      variables: { projectId, amount, message },
    });
    return data!.createBid;
  },
  acceptBid: async (id: number) => {
    const { data } = await client.mutate<{ acceptBid: Bid }>({
      mutation: ACCEPT_BID,
      variables: { id },
    });
    return data!.acceptBid;
  },
  rejectBid: async (id: number) => {
    const { data } = await client.mutate<{ rejectBid: Bid }>({
      mutation: REJECT_BID,
      variables: { id },
    });
    return data!.rejectBid;
  },
};

