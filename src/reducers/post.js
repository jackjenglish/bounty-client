import actions from '../actions/actionTypes';
import update from 'immutability-helper';

const initialState = {
  postData: {
    title: null,
    topic: null,
    value: null,
    author: 'Jack English',
    comments: [],
    offer: 0.5,
    views: 0
  },
  loading: true,
  comment: {
    content: ''
  }
};

const post = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.POST_DATA_RECEIVED: {
      return { ...state, loading: false, postData: payload };
    }
    case actions.SET_POST_DETAIL: {
      return { ...state, loading: false, postData: payload };
    }
    case actions.UPDATE_COMMENT_TEXT: {
      return update(state, {
        comment: {
          content: { $set: payload }
        }
      });
    }
    case actions.SUBMIT_COMMENT_SUCCESS: {
      console.log('comment', payload);
      return update(state, {
        postData: {
          comments: {
            $splice: [[0, 0, payload]]
          }
        },
        goToComment: { $set: payload._id }
      });
    }
    case actions.ACCEPT_REPLY_SUCCESS: {
      return update(state, {
        postData: {
          acceptedReply: { $set: payload }
        }
      });
    }
    case actions.CLEAR_ACCEPTED_REPLY_SUCCESS: {
      return update(state, {
        postData: {
          acceptedReply: { $set: null }
        }
      });
    }
    case actions.UPVOTE_POST_SUCCESS: {
      const { score } = state.postData;
      return update(state, {
        postData: {
          score: { $set: score ? score + 1 : 1 },
          upvoted: { $set: true }
        }
      });
    }
    case actions.CLEAR_POST_UPVOTE_SUCCESS: {
      const { score } = state.postData;
      return update(state, {
        postData: {
          score: { $set: score - 1 },
          upvoted: { $set: false }
        }
      });
    }
    case actions.UPVOTE_SUCCESS: {
      const { comments } = state.postData;
      const commentsWithNewUpvote = comments.map(comment => {
        if (comment._id === payload) {
          comment.upvoted = true;
          const commentScore = comment.score ? comment.score : 0;
          comment.score = commentScore + 1;
        }

        return comment;
      });

      return update(state, {
        postData: {
          comments: { $set: commentsWithNewUpvote }
        }
      });
    }
    case actions.CLEAR_UPVOTE_SUCCESS: {
      const { comments } = state.postData;
      const commentsWithNewUpvote = comments.map(comment => {
        if (comment._id === payload) {
          comment.upvoted = false;
          const commentScore = comment.score ? comment.score : 0;
          comment.score = commentScore > 0 ? commentScore - 1 : 0;
        }
        return comment;
      });

      return update(state, {
        postData: {
          comments: { $set: commentsWithNewUpvote }
        }
      });
    }
  }
  return state;
};

export default post;
