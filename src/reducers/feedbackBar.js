import actions from '../actions/actionTypes';
import update from 'immutability-helper';

const FEEDBACK_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning'
};

const initialState = {
  showFeedbackBar: false,
  feedbackText: '',
  feedbackType: ''
};

const feed = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.CLEAR_FEEDBACK_BAR: {
      return update(state, {
        showFeedbackBar: { $set: false },
        feedbackText: { $set: '' },
        feedbackType: { $set: '' }
      });
    }
    case actions.SUBMIT_POST_REPORT_SUCCESS: {
      return update(state, {
        showFeedbackBar: { $set: true },
        feedbackText: { $set: 'Report Submitted' },
        feedbackType: { $set: FEEDBACK_TYPES.SUCCESS }
      });
    }
  }
  return state;
};

export default feed;
