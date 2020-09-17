import React from "react";
import moment from "moment";

import CREATE_POST from "../mutations/createPost";

const REFETCH_QUERY = "network-only";
// const REFETCH_QUERY = "cache-only";

// HOMMER
const LOGGED_USER_ID = "FWo8IHV1NKvfRU2VY9Em";

// MARGE
// const LOGGED_USER_ID = "jb2pTTF1wWOOKGVQcNou";

// LISA
// const LOGGED_USER_ID = "g4trCZLHtwufy1RxhNCk";

// BART
// const LOGGED_USER_ID = "WQo7bneC4enAm3GomIiE";

class Feed extends React.Component {
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
          {feed.reactions.includes(LOGGED_USER_ID) ? (
            <React.Fragment>
              <span>{feed && feed.reactions && feed.reactions.length} </span>
              <span onClick={() => this.props.handleReaction(true, feed.id)}>
                <img
                  src="https://clipart.info/images/ccovers/1496175211emoji-android-heavy-black-heart.png"
                  alt="reactionActive"
                ></img>
              </span>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <span>{feed && feed.reactions && feed.reactions.length} </span>
              <span onClick={() => this.props.handleReaction(false, feed.id)}>
                <img
                  src="https://iconsetc.com/icons-watermarks/simple-black/foundation/foundation_heart/foundation_heart_simple-black_512x512.png"
                  alt="reactionInactive"
                ></img>
              </span>
            </React.Fragment>
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

  componentWillReceiveProps({ isLoading, posts }) {
    this.setState({ isLoading });
    if (this.state.newsFeed !== posts) {
      this.setState({ newsFeed: posts });
    }
  }

  handleInputChange({ target }) {
    const name = target.name;
    const value = target.value;

    this.setState({ [name]: value });
  }

  handleReaction(check, postId) {
    this.setState({ isLoading: true });

    this.props
      .toggleLike({ postId, userId: LOGGED_USER_ID })
      .then(() => {
        const { newsFeed } = this.state;
        console.log("offline handle reactions");
        const updateArrByStatus = (check, reactions) =>
          !check
            ? [...reactions, LOGGED_USER_ID]
            : reactions.filter((userIdArr) => userIdArr !== LOGGED_USER_ID);
        const newsFeedChanged = newsFeed.map((feed) => {
          if (feed.id === postId) {
            return {
              ...feed,
              reactions: [...updateArrByStatus(check, feed.reactions)],
            };
          }
          return feed;
        });
        this.setState({ newsFeed: newsFeedChanged, isLoading: false });
      })
      .catch(() => {
        this.setState({ isLoading: false });
        console.log("catch");
      })
      .finally(() => {
        console.log("finally");
      });
    // this.props.client
    //   .mutate({
    //     mutation: TOGGLE_LIKE,
    //     variables: { postId, userId: LOGGED_USER_ID },
    //     refetchQueries: () => [
    //       { query: GET_POSTS, options: { fetchPolicy: "no-cache" } },
    //     ],
    //     awaitRefetchQueries: true,
    //     optimisticResponse: {
    //       message: "Success!",
    //     },
    //   })
    //   .then(() => {
    //     const { newsFeed } = this.state;
    //     console.log("offline handle reactions");
    //     const updateArrByStatus = (check, reactions) =>
    //       !check
    //         ? [...reactions, LOGGED_USER_ID]
    //         : reactions.filter((userIdArr) => userIdArr !== LOGGED_USER_ID);
    //     const newsFeedChanged = newsFeed.map((feed) => {
    //       if (feed.id === postId) {
    //         return {
    //           ...feed,
    //           reactions: [...updateArrByStatus(check, feed.reactions)],
    //         };
    //       }
    //       return feed;
    //     });
    //     this.setState({ newsFeed: newsFeedChanged, isLoading: false });
    //   })
    //   .catch(() => {
    //     this.setState({ isLoading: false });
    //     console.log("catch");
    //   })
    //   .finally(() => {
    //     console.log("finally");
    //   });
  }

  handlePost() {
    const postCommentObject = {
      user: LOGGED_USER_ID,
      description: this.state.newComment,
    };

    this.props.client
      .mutate({
        mutation: CREATE_POST,
        variables: postCommentObject,
      })
      .then(({ data: { createPost } }) => {
        const newsFeed = [...this.state.newsFeed, createPost];

        this.setState({
          newsFeed,
          newComment: "",
          isLoading: false,
        });
      })
      .catch(() => this.setState({ isLoading: false }));
  }

  render() {
    console.log("render feed wall");
    const { newsFeed, newComment, isLoading } = this.state;

    if (isLoading && this.isOnline()) {
      return (
        <img
          className="loader"
          src="https://media2.giphy.com/media/3y0oCOkdKKRi0/giphy.gif"
          alt="loader"
        ></img>
      );
    }

    return (
      <div className="news-feed">
        <div className="news-feed__title">Feed</div>

        {(newsFeed || []).map((feed, index) => (
          <Feed
            key={index}
            feed={feed}
            index={index}
            handleReaction={(check, postId) =>
              this.handleReaction(check, postId)
            }
          ></Feed>
        ))}

        <div className="comment-section">
          <textarea
            className="comment-section__textarea"
            name="newComment"
            rows="4"
            cols="50"
            value={newComment}
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
