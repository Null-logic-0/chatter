import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { API_URL, WS_URL } from "./urls";
import { onError } from "@apollo/client/link/error";
import excludedRoutes from "./excluded-routes";
import { onLogout } from "../utils/logout";
import { createClient } from "graphql-ws";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";

const logoutLink = onError((error) => {
  if (
    error.graphQLErrors?.length &&
    (error?.graphQLErrors[0]?.extensions?.originalError as any)?.statusCode ===
      401
  ) {
    if (!excludedRoutes.includes(window.location.pathname)) {
      onLogout();
    }
  }
});

const httpLink = new HttpLink({
  uri: `${API_URL}/graphql`,
  credentials: "include",
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: `wss://${WS_URL}/graphql`,
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: logoutLink.concat(splitLink),
  cache: new InMemoryCache(),
});

export default client;
