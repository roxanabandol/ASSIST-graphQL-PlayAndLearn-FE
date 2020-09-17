import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router } from "react-router-dom";
import "regenerator-runtime/runtime";
import { ApolloProvider } from "@apollo/client";

import App from "./App";
import client from "./apollo.config";
import * as serviceWorker from "./serviceWorker";

import { ApolloProvider as ApolloHooksProvider } from "@apollo/react-hooks";

import "./index.scss";

ReactDOM.render(
  <ApolloProvider client={client}>
    <ApolloHooksProvider client={client}>
      <Router>
        <App />
      </Router>
    </ApolloHooksProvider>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
