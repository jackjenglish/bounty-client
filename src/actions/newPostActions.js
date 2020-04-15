import axios from 'axios';
import simpleAction from './simpleAction';
import actions from './actionTypes';
import jwtHeader from '../utils/jwtHeader';

export const updateComposeField = (field, value) => {
  return {
    type: actions.UPDATE_COMPOSE_FIELD,
    payload: { field, value }
  };
};

export const submitPost = () => {
  return async (dispatch, getState) => {
    const { title, description, value, selectedTopics } = getState().compose;
    const topicIds = selectedTopics.map(topic => topic.value);
    dispatch({ type: actions.SUBMIT_POST_REQUEST });
    try {
      const response = await axios.post(
        '/api/submit-post',
        {
          title,
          description,
          value: Number(value),
          topics: topicIds
        },
        { headers: jwtHeader() }
      );

      dispatch({
        type: actions.SUBMIT_POST_SUCCESS,
        payload: response.data
      });
    } catch (e) {
      console.log('caught', e);
    }
  };
};

export function fetchTopics() {
  return async dispatch => {
    try {
      const { data } = await axios.get('/api/topics');

      return dispatch({
        type: actions.TOPICS_RECEIVED,
        payload: data
      });
    } catch (e) {}
  };
}
