import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router } from "react-router-dom";
import "regenerator-runtime/runtime";
import { ApolloProvider } from "@apollo/client";

import App from "./App";
import apolloInstances from "./apollo.config";
import * as serviceWorker from "./serviceWorker";

import { ApolloProvider as ApolloHooksProvider } from "@apollo/react-hooks";

import "./index.scss";
const { queueLinkInstance } = apolloInstances;

ReactDOM.render(
  <ApolloProvider client={apolloInstances.client}>
    <ApolloHooksProvider client={apolloInstances.client}>
      <Router>
        <App queueLink={queueLinkInstance} />
      </Router>
    </ApolloHooksProvider>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
