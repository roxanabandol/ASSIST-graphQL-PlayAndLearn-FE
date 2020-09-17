import { graphql } from "react-apollo";

import GET_POSTS from "../../queries/getPosts";

export default graphql(GET_POSTS, {
  name: "getPosts",
  options: {
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  },
  props: ({ getPosts }) => {
    console.log(getPosts);
    const posts = getPosts.posts || {};

    return {
      posts,
      isLoading: getPosts.loading,
    };
  },
});
