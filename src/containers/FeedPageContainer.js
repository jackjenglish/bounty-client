import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setPostDetail } from '../actions/feedActions';
import { getPosts } from '../actions/feedActions';
import { upvotePost, clearUpvotePost } from '../actions/postActions';
import FeedPage from '../components/FeedPage/FeedPage';

function mapStateToProps({ feed, auth }) {
  return {
    posts: feed.posts,
    loading: feed.loading,
    loggedIn: auth.loggedIn,
    user: auth.user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setPostDetail,
      getPosts,
      upvotePost,
      clearUpvotePost
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedPage);
