import React, { Component } from "react";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
  concat,
} from "@apollo/client";
import { RetryLink } from "apollo-link-retry";
import { persistCache } from "apollo-cache-persist";
import "./App.scss";

import FeedWall from "./FeedWall";

class App extends Component {
  state = { client: null };

  async componentDidMount() {
    const cache = new InMemoryCache();

    const http = new HttpLink({
      uri:
        "https://us-central1-assist-gql-presentation.cloudfunctions.net/graphql",
    });

    const retry = new RetryLink({
      attempts: { max: Infinity },
      delay: {
        initial: 300,
        max: Infinity,
        jitter: true,
      },
    });
    const link = concat(retry, http);
    await persistCache({
      cache,
      storage: window.localStorage,
    });

    const client = new ApolloClient({
      link,
      cache,
    });
    this.setState({ client });
  }

  render() {
    const { client } = this.state;
    return (
      (client && (
        <ApolloProvider client={client}>
          <FeedWall client={client}></FeedWall>
        </ApolloProvider>
      )) || <div></div>
    );
  }
}

export default App;
