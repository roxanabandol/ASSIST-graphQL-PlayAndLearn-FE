import { gql } from "@apollo/client";

const TOGGLE_LIKE = gql`
  mutation($postId: String!, $userId: String!) {
    toggleLike(postId: $postId, userId: $userId) {
      message
    }
  }
`;

export default TOGGLE_LIKE;
