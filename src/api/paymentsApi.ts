import { gql } from '@apollo/client';
import { client } from './projectsApi';

export interface Wallet {
  id: number;
  balance: number;
}

export interface Transaction {
  id: number;
  amount: number;
  type: string;
  status: string;
  createdAt: string;
}

export const GET_WALLET = gql`
  query GetWallet {
    wallet {
      id
      balance
    }
  }
`;

export const LIST_TRANSACTIONS = gql`
  query ListTransactions {
    transactions {
      id
      type
      amount
      status
      createdAt
    }
  }
`;

export const DEPOSIT = gql`
  mutation Deposit($amount: Float!) {
    deposit(amount: $amount) {
      id
      balance
    }
  }
`;

export const WITHDRAW = gql`
  mutation Withdraw($amount: Float!) {
    withdraw(amount: $amount) {
      id
      balance
    }
  }
`;

export const TRANSFER = gql`
  mutation Transfer($toUserId: Int!, $amount: Float!) {
    transfer(toUserId: $toUserId, amount: $amount) {
      id
      balance
    }
  }
`;

export const paymentsApi = {
  getWallet: async () => {
    const { data } = await client.query<{ wallet: Wallet }>({
      query: GET_WALLET,
    });
    return data!.wallet;
  },
  getTransactions: async () => {
    const { data } = await client.query<{ transactions: Transaction[] }>({
      query: LIST_TRANSACTIONS,
    });
    return data!.transactions;
  },
  deposit: async (amount: number) => {
    const { data } = await client.mutate<{ deposit: Wallet }>({
      mutation: DEPOSIT,
      variables: { amount },
    });
    return data!.deposit;
  },
  withdraw: async (amount: number) => {
    const { data } = await client.mutate<{ withdraw: Wallet }>({
      mutation: WITHDRAW,
      variables: { amount },
    });
    return data!.withdraw;
  },
  transfer: async (toUserId: number, amount: number) => {
    const { data } = await client.mutate<{ transfer: Wallet }>({
      mutation: TRANSFER,
      variables: { toUserId, amount },
    });
    return data!.transfer;
  },
};

