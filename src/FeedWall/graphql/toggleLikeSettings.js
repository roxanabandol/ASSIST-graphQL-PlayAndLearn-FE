import { graphql } from "react-apollo";

import TOGGLE_LIKE from "../../mutations/toggleLike";
import GET_POSTS from "../../queries/getPosts";

export default graphql(TOGGLE_LIKE, {
  options: () => ({
    refetchQueries: () => [
      { query: GET_POSTS, options: { fetchPolicy: "no-cache" } },
    ],
  }),
  props: (props) => ({
    toggleLike: ({ postId, userId }) => {
      return props.mutate({
        variables: {
          postId,
          userId,
        },
        optimisticResponse: {
          message: "Success!",
        },
      });
    },
  }),
});
