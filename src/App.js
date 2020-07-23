import React, { Component } from "react";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";

import GET_POSTS from "./queries/getPosts";
import "./App.scss";

import FeedWall from "./FeedWall";

const client = new ApolloClient({
  uri: "https://us-central1-assist-gql-presentation.cloudfunctions.net/graphql",
  cache: new InMemoryCache(),
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <FeedWall client={client}></FeedWall>
      </ApolloProvider>
    );
  }
}

export default App;
