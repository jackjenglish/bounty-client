import actions from '../actions/actionTypes';
import update from 'immutability-helper';
import getObjectIndexByValue from '../utils/getObjectIndexByValue';

const initialState = {
  commentReports: [],
  postReports: [],
  loading: true
};

const REPORT_ACTIONS = {
  POST_REMOVED: 'post-removed',
  COMMENT_REMOVED: 'comment-removed',
  REPORT_DISREGARD: 'report-disregard'
};

const keyBy = (list, field) => {
  const keyByField = {};
  list.forEach(item => {
    const fieldValue = item[field];
    if (fieldValue) {
      keyByField[fieldValue] = item;
    }
  });
  return keyByField;
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
    case actions.POST_REMOVED: {
      const reportIndex = getObjectIndexByValue(
        state.postReports,
        '_id',
        payload._id
      );
      return update(state, {
        postReports: {
          [reportIndex]: {
            actionTaken: { $set: REPORT_ACTIONS.POST_REMOVED }
          }
        }
      });
    }
    case actions.REPORT_RESOLVED: {
      const { type, _id } = payload.report;
      const reports =
        type === 'post' ? state.postReports : state.commentReports;
      const reportType = type === 'post' ? 'postReports' : 'commentReports';
      const reportIndex = getObjectIndexByValue(reports, '_id', _id);
      console.log('report resolved', reportIndex);
      return update(state, {
        [reportType]: {
          [reportIndex]: {
            actionTaken: { $set: payload.reportAction }
          }
        }
      });
    }
  }
  return state;
};

export default feed;
