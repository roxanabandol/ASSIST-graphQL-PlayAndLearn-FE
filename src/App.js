import React, { Component } from "react";

import "./App.scss";
import FeedWall from "./FeedWall";

class App extends Component {
  state = { client: null };

  render() {
    return <FeedWall></FeedWall>;
  }
}

export default App;
