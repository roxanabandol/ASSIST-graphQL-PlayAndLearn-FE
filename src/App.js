import React, { Component, Fragment } from "react";
import logo from "./logo.svg";
import "./App.scss";
import moment from "moment";

class App extends Component {
  state = {
    newsFeed: [
      {
        author: "Roxana Bandol",
        authorImage: logo,
        data: 1589194452,
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        numberOfReactions: [1, 2],
      },
      {
        author: "Andrei Vasilache",
        authorImage: logo,
        data: 1589194298,
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        numberOfReactions: [1, 2],
      },
    ],
  };

  render() {
    const { newsFeed } = this.state;

    return (
      <div className="news-feed">
        <div>Live feed</div>
        {newsFeed.map((newFeed, index) => (
          <div className="news-feed__element" key={index}>
            <div className="news-feed__author-info-wrapper">
              <img
                src={newFeed.authorImage}
                alt="authorImg"
                className="news-feed__author-image"
              ></img>
              <div className="news-feed__author-info">
                <div className="news-feed__author">{newFeed.author}</div>
                <div className="news-feed__data">
                  {moment(newFeed.data).format("MM/DD/YYYY")}
                </div>
              </div>
            </div>
            <div className="news-feed__description">{newFeed.description}</div>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
