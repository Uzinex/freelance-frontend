import { ApolloClient, InMemoryCache, createHttpLink, gql } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useAuthStore } from '../store/authStore';

const httpLink = createHttpLink({
  uri: 'http://localhost:8000/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = useAuthStore.getState().accessToken;
  return {
    headers: {
      ...headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export const LIST_PROJECTS = gql`
  query ListProjects {
    projects {
      id
      title
      budgetMin
      budgetMax
      status
    }
  }
`;

export const GET_PROJECT = gql`
  query GetProject($id: Int!) {
    project(id: $id) {
      id
      title
      description
      owner {
        id
        username
      }
      budgetMin
      budgetMax
      status
    }
  }
`;

export const CREATE_PROJECT = gql`
  mutation CreateProject($title: String!, $description: String!, $budgetMin: Float, $budgetMax: Float) {
    createProject(title: $title, description: $description, budgetMin: $budgetMin, budgetMax: $budgetMax) {
      id
      title
    }
  }
`;

export const UPDATE_PROJECT = gql`
  mutation UpdateProject($id: Int!, $title: String, $description: String, $budgetMin: Float, $budgetMax: Float, $status: String) {
    updateProject(id: $id, title: $title, description: $description, budgetMin: $budgetMin, budgetMax: $budgetMax, status: $status) {
      id
      title
      description
      budgetMin
      budgetMax
      status
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation DeleteProject($id: Int!) {
    deleteProject(id: $id)
  }
`;
