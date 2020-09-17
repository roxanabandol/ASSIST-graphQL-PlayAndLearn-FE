import React, { Component } from "react";

import "./App.scss";
import FeedWall from "./FeedWall";

class App extends Component {
  state = { client: null };

  isOnline() {
    return navigator.onLine != null ? navigator.onLine : true;
  }

  componentDidMount() {
    const { queueLink } = this.props;

    if (!this.isOnline()) {
      console.log("offline");
      queueLink && queueLink.close();
    } else {
      console.log("online");
      queueLink && queueLink.open();
    }
    console.log({ queueLink });
  }

  render() {
    return <FeedWall></FeedWall>;
  }
}

export default App;
