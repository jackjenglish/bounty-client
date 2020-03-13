import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PostPage from '../components/PostPage/PostPage';
import {
  fetchPostData,
  updateCommentText,
  submitComment,
  clearAccepted,
  setAccepted,
  upvoteComment,
  upvotePost,
  clearUpvotePost,
  clearUpvoteComment,
  submitPostReport,
  submitCommentReport
} from '../actions/postActions';

function mapStateToProps({ post, auth }) {
  return {
    user: auth.user,
    goToComment: post.goToComment,
    postData: post.postData,
    loading: post.loading,
    commentText: post.comment.content
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchPostData,
      submitComment,
      updateCommentText,
      clearAccepted,
      setAccepted,
      upvoteComment,
      clearUpvoteComment,
      upvotePost,
      clearUpvotePost,
      submitPostReport,
      submitCommentReport
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostPage);
