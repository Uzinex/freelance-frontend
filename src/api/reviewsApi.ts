import { gql } from '@apollo/client';
import { client } from './projectsApi';

export interface Review {
  id: number;
  author: {
    id: number;
    username: string;
  };
  rating: number;
  comment: string | null;
  createdAt: string;
}

export const LIST_REVIEWS = gql`
  query ListReviews($userId: Int!) {
    reviews(userId: $userId) {
      id
      author {
        id
        username
      }
      rating
      comment
      createdAt
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation CreateReview($projectId: Int!, $rating: Int!, $comment: String) {
    createReview(projectId: $projectId, rating: $rating, comment: $comment) {
      id
      author {
        id
        username
      }
      rating
      comment
      createdAt
    }
  }
`;

export const reviewsApi = {
  listReviews: async (userId: number) => {
    const { data } = await client.query<{ reviews: Review[] }>({
      query: LIST_REVIEWS,
      variables: { userId },
    });
    return data!.reviews;
  },
  createReview: async (projectId: number, rating: number, comment?: string) => {
    const { data } = await client.mutate<{ createReview: Review }>({
      mutation: CREATE_REVIEW,
      variables: { projectId, rating, comment },
    });
    return data!.createReview;
  },
};

