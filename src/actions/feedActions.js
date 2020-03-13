import axios from 'axios';
import actions from './actionTypes';
import jwtHeader from '../utils/jwtHeader';

export function getPosts() {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.post(
        '/api/posts',
        {},
        { headers: jwtHeader() }
      );

      return dispatch({
        type: actions.POSTS_RECEIVED,
        payload: data
      });
    } catch (e) {}
  };
}

export function setPostDetail(question) {
  return { type: actions.SET_POST_DETAIL, payload: question };
}
