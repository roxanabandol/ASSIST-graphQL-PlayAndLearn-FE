import React, { Fragment } from "react";
import moment from "moment";

import GET_POSTS from "./queries/getPosts";
import { ReactComponent as ReactionInActive } from "../src/assets/reactionInActive.svg";
import { ReactComponent as ReactionActive } from "../src/assets/reactionActive.svg";

class Feed extends React.Component {
  render() {
    const { feed, index } = this.props;

    return (
      <div className="news-feed__element" key={index}>
        <div className="news-feed__author-info-wrapper">
          <img
            src={feed.authorImage}
            alt="authorImg"
            className="news-feed__author-image"
          ></img>
          <div className="news-feed__author-info">
            <div className="news-feed__author">{feed.author}</div>
            <div className="news-feed__data">
              {feed && feed.date && moment(feed.date).format("MM/DD/YYYY")}
            </div>
          </div>
        </div>
        {feed.reactions && feed.reactions.length ? (
          <React.Fragment>
            <span>{feed && feed.reactions && feed.reactions.length} </span>
            <span onClick={() => this.props.handleReaction(true, index)}>
              <ReactionActive></ReactionActive>
            </span>
          </React.Fragment>
        ) : (
          <span onClick={() => this.props.handleReaction(false, index)}>
            <ReactionInActive></ReactionInActive>
          </span>
        )}

        <div className="news-feed__description">{feed.description}</div>
      </div>
    );
  }
}

class FeedWall extends React.Component {
  state = {
    newsFeed: [],
    newComment: "",
  };

  componentDidMount() {
    this.props.client
      .query({
        query: GET_POSTS,
        options: { fetchPolicy: "cache-and-network" },
      })
      .then(({ data }) => {
        console.log(data.posts);
        this.setState({ newsFeed: data.posts });
      });
  }

  handleInputChange({ target }) {
    const name = target.name;
    const value = target.value;

    this.setState({ [name]: value });
  }

  handleReaction(check, index) {
    // TODO: Mutation
    console.log(check);
    console.log(index);
  }

  handlePost() {
    console.log(this.state.newComment);
  }

  render() {
    const { newsFeed } = this.state;

    return (
      <div className="news-feed">
        <div className="news-feed__title">Feed</div>
        {newsFeed.map((feed, index) => (
          <Feed
            key={index}
            feed={feed}
            index={index}
            handleReaction={(check, index) => this.handleReaction(check, index)}
          ></Feed>
        ))}

        <div className="comment-section">
          <textarea
            className="comment-section__textarea"
            name="newComment"
            rows="4"
            cols="50"
            onChange={(event) => this.handleInputChange(event)}
          ></textarea>

          <button
            className="comment-section__submit-button"
            type="submit"
            onClick={() => this.handlePost()}
          >
            SUBMIT
          </button>
        </div>
      </div>
    );
  }
}

export default FeedWall;
