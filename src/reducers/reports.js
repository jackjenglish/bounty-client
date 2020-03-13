import actions from '../actions/actionTypes';
import update from 'immutability-helper';

const initialState = {
  commentReports: [],
  postReports: [],
  loading: true
};

const feed = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.REPORTS_RECEIVED: {
      const { commentReports, postReports } = payload;
      return { ...state, loading: false, commentReports, postReports };
    }
    case actions.POST_REPORTS_RECEIVED: {
      return { ...state, postReports: payload };
    }
  }
  return state;
};

export default feed;
