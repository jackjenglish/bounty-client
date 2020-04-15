import actions from '../actions/actionTypes';
import update from 'immutability-helper';

const initialState = {
  posts: [],
  pageNumber: 1,
  loading: true
};

const getPostsIndex = (posts, slugId) => {
  for (let i = 0; i < posts.length; i += 1) {
    if (posts[i].slugId === slugId) {
      return i;
    }
  }
  return -1;
};

const feed = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.POSTS_RECEIVED: {
      return { ...state, loading: false, posts: payload };
    }
    case actions.UPVOTE_POST_SUCCESS: {
      const { posts } = state;
      let postIndex = getPostsIndex(posts, payload);
      if (postIndex >= 0) {
        const curScore = posts[postIndex].score;
        return update(state, {
          posts: {
            [postIndex]: {
              score: { $set: curScore ? curScore + 1 : 1 },
              upvoted: { $set: true }
            }
          }
        });
      }
      return state;
    }
    case actions.CLEAR_POST_UPVOTE_SUCCESS: {
      const { posts } = state;
      let postIndex = getPostsIndex(posts, payload);
      if (postIndex >= 0) {
        const curScore = posts[postIndex].score;
        return update(state, {
          posts: {
            [postIndex]: {
              score: { $set: curScore - 1 },
              upvoted: { $set: false }
            }
          }
        });
      }
      return state;
    }
  }
  return state;
};

export default feed;
