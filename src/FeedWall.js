import React from "react";
import moment from "moment";

import GET_POSTS from "./queries/getPosts";
import CREATE_POST from "./mutations/createPost";
import TOGGLE_LIKE from "./mutations/toggleLike";
import { Query, Mutation } from "react-apollo";

const REFETCH_QUERY = "network-only";
const REFETCH_QUERY_OFFLINE = "cache-only";

// HOMMER
const LOGGED_USER_ID = "FWo8IHV1NKvfRU2VY9Em";

// MARGE
// const LOGGED_USER_ID = "jb2pTTF1wWOOKGVQcNou";

// LISA
// const LOGGED_USER_ID = "g4trCZLHtwufy1RxhNCk";

// BART
// const LOGGED_USER_ID = "WQo7bneC4enAm3GomIiE";

class Feed extends React.Component {
  ToggleLike = ({ feed, srcImage }) => {
    console.log(feed && feed.id, "feed");
    return (
      <React.Fragment>
        <span>{feed && feed.reactions && feed.reactions.length} </span>

        <Mutation
          mutation={TOGGLE_LIKE}
          refetchQueries={() => [{ query: GET_POSTS }]}
        >
          {(toggleLike, { data }) => (
            <>
              <span
                onClick={() =>
                  toggleLike({
                    variables: {
                      postId: feed && feed.id,
                      userId: LOGGED_USER_ID,
                    },
                  })
                }
              >
                <img src={srcImage} alt="reactionImage"></img>
              </span>
            </>
          )}
        </Mutation>
      </React.Fragment>
    );
  };
  render() {
    const { feed, index } = this.props;

    return (
      <div className="news-feed__element" key={index}>
        <div className="news-feed__author-info-wrapper">
          <img
            src={feed.user.profileImgUrl}
            alt="authorImg"
            className="news-feed__author-image"
          ></img>
          <div className="news-feed__author-info">
            <div className="news-feed__author">{feed.user.name}</div>
            <div className="news-feed__data">
              {moment(+feed.date).format("MM/DD/YYYY")}
            </div>
          </div>
        </div>

        <div className="news-feed__description">{feed.description}</div>

        <div className="news-feed__reaction">
          {feed && feed.reactions.includes(LOGGED_USER_ID)
            ? feed && (
                <this.ToggleLike
                  feed={feed}
                  srcImage="https://clipart.info/images/ccovers/1496175211emoji-android-heavy-black-heart.png"
                />
              )
            : feed && (
                <this.ToggleLike
                  feed={feed}
                  srcImage="https://iconsetc.com/icons-watermarks/simple-black/foundation/foundation_heart/foundation_heart_simple-black_512x512.png"
                />
              )}
        </div>
      </div>
    );
  }
}

class FeedWall extends React.Component {
  state = {
    newsFeed: [],
    newComment: "",
    isLoading: true,
  };

  isOnline() {
    return navigator.onLine != null ? navigator.onLine : true;
  }

  handleInputChange({ target }) {
    const name = target.name;
    const value = target.value;

    this.setState({ [name]: value });
  }

  handleNewPostCreation() {
    this.setState({
      newComment: "",
      isLoading: false,
    });
  }

  render() {
    const { newComment, isLoading } = this.state;

    return (
      <div className="news-feed">
        <div className="news-feed__title">Feed</div>
        <Query
          query={GET_POSTS}
          fetchPolicy={this.isOnline() ? REFETCH_QUERY : REFETCH_QUERY_OFFLINE}
        >
          {({ data }) => {
            data &&
              data.isLoading !== isLoading &&
              this.setState({ isLoading: data.isLoading });
            return ((data && data.posts) || []).map((feed, index) => (
              <Feed key={index} feed={feed} index={index}></Feed>
            ));
          }}
        </Query>

        {isLoading && this.isOnline() && (
          <img
            className="loader"
            src="https://media2.giphy.com/media/3y0oCOkdKKRi0/giphy.gif"
            alt="loader"
          ></img>
        )}

        <div className="comment-section">
          <textarea
            className="comment-section__textarea"
            name="newComment"
            rows="4"
            cols="50"
            value={newComment}
            onChange={(event) => this.handleInputChange(event)}
          ></textarea>

          <Mutation
            mutation={CREATE_POST}
            onCompleted={() => this.handleNewPostCreation()}
            refetchQueries={() => [{ query: GET_POSTS }]}
          >
            {(addPost, { data }) => (
              <>
                <button
                  className="comment-section__submit-button"
                  type="submit"
                  onClick={() =>
                    addPost({
                      variables: {
                        user: LOGGED_USER_ID,
                        description: this.state.newComment,
                      },
                    })
                  }
                >
                  SUBMIT
                </button>
              </>
            )}
          </Mutation>
        </div>
      </div>
    );
  }
}

export default FeedWall;
