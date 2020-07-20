import React, { Component } from "react";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";
import { useQuery } from "@apollo/client";
import moment from "moment";

import logo from "./logo.svg";
import "./App.scss";
import { ReactComponent as ReactionInActive } from "./assets/reactionInActive.svg";
import { ReactComponent as ReactionActive } from "./assets/reactionActive.svg";
import GET_POSTS from "./queries/getPosts";

const client = new ApolloClient({
  uri: "https://us-central1-assist-gql-presentation.cloudfunctions.net/graphql",
  cache: new InMemoryCache(),
});

class App extends Component {
  state = {
    newsFeed: [],
  };
  componentDidMount() {
    client
      .query({
        query: GET_POSTS,
        options: { fetchPolicy: "cache-and-network" },
      })
      .then(({ data }) => {
        console.log(data.posts);
        this.setState({ newsFeed: data.posts });
      });
  }

  render() {
    const { newsFeed } = this.state;

    return (
      <ApolloProvider client={client}>
        <div className="news-feed">
          <div>Feed</div>
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
                    {moment(newFeed.date).format("MM/DD/YYYY")}
                  </div>
                </div>
              </div>
              {newFeed.reactions && newFeed.reactions.length ? (
                <React.Fragment>
                  <span>{newFeed.reactions && newFeed.reactions.length} </span>
                  <span>
                    <ReactionActive></ReactionActive>
                  </span>
                </React.Fragment>
              ) : (
                <span>
                  <ReactionInActive></ReactionInActive>
                </span>
              )}

              <div className="news-feed__description">
                {newFeed.description}
              </div>
            </div>
          ))}
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
