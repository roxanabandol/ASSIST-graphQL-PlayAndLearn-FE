import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import { RetryLink } from "apollo-link-retry";
import { persistCache } from "apollo-cache-persist";
import QueueLink from "apollo-link-queue";
import getApolloLink from "./apollo.link";

const queueLink = new QueueLink();

const cache = new InMemoryCache();
const http = new HttpLink({
  uri: "https://us-central1-assist-gql-presentation.cloudfunctions.net/graphql",
});

const retry = new RetryLink({
  attempts: { max: Infinity },
  delay: {
    initial: 300,
    max: Infinity,
    jitter: true,
  },
});
// const link = concat(retry, http);

const link = ApolloLink.from([
  // new RetryLink(),
  retry,
  queueLink,
  http,
  // new HttpLink({ uri: cache }),
]);
persistCache({
  cache,
  storage: window.localStorage,
});
console.log(getApolloLink);
// const link = getApolloLink(cache);

const client = new ApolloClient({
  link,
  cache,
  defaultOptions: {
    query: {
      errorPolicy: "all",
    },
  },
});

export default { client, queueLinkInstance: queueLink };
