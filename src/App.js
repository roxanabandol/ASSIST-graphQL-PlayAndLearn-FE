import React, { Component } from "react";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";
import { persistCache } from "apollo-cache-persist";
import "./App.scss";

import FeedWall from "./FeedWall";

class App extends Component {
  state = { client: null };

  async componentDidMount() {
    const cache = new InMemoryCache();

    await persistCache({
      cache,
      storage: window.localStorage,
    });

    const client = new ApolloClient({
      uri:
        "https://us-central1-assist-gql-presentation.cloudfunctions.net/graphql",
      cache,
    });
    this.setState({ client });

    window.addEventListener("online", () => {
      window.location.reload();
    });

    window.addEventListener("offline", () => {
      window.location.reload();
    });
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
