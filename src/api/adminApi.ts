import { gql } from '@apollo/client';
import { client } from './projectsApi';

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  isActive: boolean;
}

export interface Project {
  id: number;
  title: string;
  status: string;
}

export interface Bid {
  id: number;
  amount: number;
  status: string;
}

export interface Review {
  id: number;
  rating: number;
  comment: string;
}

export interface Transaction {
  id: number;
  amount: number;
  type: string;
}

const GET_ALL_USERS = gql`
  query GetAllUsers {
    allUsers {
      id
      username
      email
      role
      isActive
    }
  }
`;

const BAN_USER = gql`
  mutation BanUser($userId: Int!) {
    banUser(userId: $userId)
  }
`;

const GET_ALL_PROJECTS = gql`
  query GetAllProjects {
    allProjects {
      id
      title
      status
    }
  }
`;

const GET_ALL_BIDS = gql`
  query GetAllBids {
    allBids {
      id
      amount
      status
    }
  }
`;

const RESOLVE_DISPUTE = gql`
  mutation ResolveDispute($bidId: Int!) {
    resolveDispute(bidId: $bidId)
  }
`;

const GET_ALL_REVIEWS = gql`
  query GetAllReviews {
    allReviews {
      id
      rating
      comment
    }
  }
`;

const DELETE_REVIEW = gql`
  mutation DeleteReview($reviewId: Int!) {
    deleteReview(reviewId: $reviewId)
  }
`;

const GET_ALL_TRANSACTIONS = gql`
  query GetAllTransactions {
    allTransactions {
      id
      amount
      type
    }
  }
`;

export const adminApi = {
  getAllUsers: async (): Promise<User[]> => {
    const { data } = await client.query<{ allUsers: User[] }>({
      query: GET_ALL_USERS,
    });
    return data!.allUsers;
  },
  banUser: async (userId: number): Promise<boolean> => {
    const { data } = await client.mutate<{ banUser: boolean }>({
      mutation: BAN_USER,
      variables: { userId },
    });
    return data!.banUser;
  },
  getAllProjects: async (): Promise<Project[]> => {
    const { data } = await client.query<{ allProjects: Project[] }>({
      query: GET_ALL_PROJECTS,
    });
    return data!.allProjects;
  },
  getAllBids: async (): Promise<Bid[]> => {
    const { data } = await client.query<{ allBids: Bid[] }>({
      query: GET_ALL_BIDS,
    });
    return data!.allBids;
  },
  resolveDispute: async (bidId: number): Promise<boolean> => {
    const { data } = await client.mutate<{ resolveDispute: boolean }>({
      mutation: RESOLVE_DISPUTE,
      variables: { bidId },
    });
    return data!.resolveDispute;
  },
  getAllReviews: async (): Promise<Review[]> => {
    const { data } = await client.query<{ allReviews: Review[] }>({
      query: GET_ALL_REVIEWS,
    });
    return data!.allReviews;
  },
  deleteReview: async (reviewId: number): Promise<boolean> => {
    const { data } = await client.mutate<{ deleteReview: boolean }>({
      mutation: DELETE_REVIEW,
      variables: { reviewId },
    });
    return data!.deleteReview;
  },
  getAllTransactions: async (): Promise<Transaction[]> => {
    const { data } = await client.query<{ allTransactions: Transaction[] }>({
      query: GET_ALL_TRANSACTIONS,
    });
    return data!.allTransactions;
  },
};
