import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  updateComposeField,
  submitPost,
  fetchTopics
} from '../actions/newPostActions';
import { fetchUserBalance } from '../actions/authActions';
import CreatePostPage from '../components/NewPost/CreatePostPage';

function mapStateToProps({ compose, auth }) {
  return {
    loggedIn: auth.loggedIn,
    user: auth.user,
    title: compose.title,
    description: compose.description,
    value: compose.value,
    topics: compose.topics,
    selectedTopics: compose.selectedTopics,
    postCreated: compose.postCreated,
    createdId: compose.createdId
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchTopics,
      fetchUserBalance,
      updateComposeField,
      submitPost
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePostPage);
