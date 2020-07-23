import { gql } from "@apollo/client";

const CREATE_POST = gql`
  mutation($description: String!, $user: ID!) {
    createPost(description: $description, user: $user) {
      id
      description
      date
      reactions
      user {
        name
        profileImgUrl
      }
    }
  }
`;

export default CREATE_POST;
