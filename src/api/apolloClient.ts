import { ApolloClient, InMemoryCache } from "@apollo/client";
import { GRAPHQL_URL } from "../config";  // ✅ теперь берём из config.ts

export const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache(),
});
