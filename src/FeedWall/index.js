import { flowRight as compose } from "lodash";
import { withApollo } from "react-apollo";

import FeedWall from "./FeedWall";
import toggleLikeSettings from "./graphql/toggleLikeSettings";
import getPostsSettings from "./graphql/getPostsSettings";

export default compose(
  withApollo,
  toggleLikeSettings,
  getPostsSettings
)(FeedWall);
