import { gql } from "@apollo/client";

const CREATE_POST = gql`
  mutation($postId: String!, $userId: String!) {
    toggleLike(postId: $postId, userId: $userId) {
      message
    }
  }
`;

export default CREATE_POST;
