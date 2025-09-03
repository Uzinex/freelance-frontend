import { gql } from '@apollo/client';
import { client } from './projectsApi';

export interface PaymentGatewayTransaction {
  id: number;
  provider: string;
  amount: number;
  status: string;
  providerTxnId: string | null;
  createdAt: string;
}

const INITIATE_PAYMENT = gql`
  mutation InitiatePayment($provider: String!, $amount: Float!) {
    initiatePayment(provider: $provider, amount: $amount)
  }
`;

const LIST_PAYMENT_TRANSACTIONS = gql`
  query PaymentTransactions {
    paymentTransactions {
      id
      provider
      amount
      status
      providerTxnId
      createdAt
    }
  }
`;

const WITHDRAW = gql`
  mutation Withdraw($amount: Float!) {
    withdraw(amount: $amount) {
      id
      balance
    }
  }
`;

export const paymentGatewayApi = {
  initiatePayment: async (provider: string, amount: number) => {
    const { data } = await client.mutate<{ initiatePayment: string }>({
      mutation: INITIATE_PAYMENT,
      variables: { provider, amount },
    });
    return data!.initiatePayment;
  },
  getPaymentTransactions: async () => {
    const { data } = await client.query<{ paymentTransactions: PaymentGatewayTransaction[] }>({
      query: LIST_PAYMENT_TRANSACTIONS,
      fetchPolicy: 'no-cache',
    });
    return data!.paymentTransactions;
  },
  withdraw: async (amount: number) => {
    const { data } = await client.mutate({
      mutation: WITHDRAW,
      variables: { amount },
    });
    return data!.withdraw;
  },
};

export type { PaymentGatewayTransaction as PaymentGatewayTransactionType };
