import axios from 'axios';
import actions from './actionTypes';
import jwtHeader from '../utils/jwtHeader';

export function getReports() {
  return async (dispatch, getState) => {
    try {
      const [
        { data: commentReports },
        { data: postReports }
      ] = await Promise.all([
        axios.get('/api/comment-reports', { headers: jwtHeader() }),
        axios.get('/api/post-reports', { headers: jwtHeader() })
      ]);

      return dispatch({
        type: actions.REPORTS_RECEIVED,
        payload: { commentReports, postReports }
      });
    } catch (e) {}
  };
}

export function removePost(report) {
  return async (dispatch, getState) => {
    try {
      console.log('remove post', report);

      return dispatch({
        type: actions.POST_REMOVED,
        payload: report
      });
    } catch (e) {}
  };
}

export function takeReportAction(report, reportAction) {
  return async (dispatch, getState) => {
    try {
      console.log('report action', report, reportAction);
      const res = await axios.post(
        '/api/report-action',
        {
          report,
          reportAction
        },
        { headers: jwtHeader() }
      );
      console.log('report actions res', res);
      // const [
      //   { data: commentReports },
      //   { data: postReports }
      // ] = await Promise.all([
      //   axios.get('/api/comment-reports', { headers: jwtHeader() }),
      //   axios.get('/api/post-reports', { headers: jwtHeader() })
      // ]);

      return dispatch({
        type: actions.REPORT_RESOLVED,
        payload: { report, reportAction }
      });
    } catch (e) {}
  };
}

export function setPostDetail(question) {
  return { type: actions.SET_POST_DETAIL, payload: question };
}
