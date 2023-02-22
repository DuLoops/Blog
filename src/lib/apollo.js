import { ApolloClient, InMemoryCache } from "@apollo/client";
import { STRAPI_URL } from "./strapi";
const client = new ApolloClient({
  uri: STRAPI_URL + "/graphql",
  cache: new InMemoryCache(),
});

export default client;
