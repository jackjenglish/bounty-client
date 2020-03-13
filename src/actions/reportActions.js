import axios from 'axios';
import actions from './actionTypes';
import jwtHeader from '../utils/jwtHeader';

export function getReports() {
  return async (dispatch, getState) => {
    try {
      console.log('req');
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

export function setPostDetail(question) {
  return { type: actions.SET_POST_DETAIL, payload: question };
}
