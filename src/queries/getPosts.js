import { gql } from "@apollo/client";

const GET_POSTS = gql`
  query {
    posts {
      id
      description
      date
      user {
        id
        profileImgUrl
        name
      }
      reactions
    }
  }
`;

export default GET_POSTS;
