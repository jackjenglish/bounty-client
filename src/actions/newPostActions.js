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
    const { title, description, value } = getState().compose;

    dispatch({ type: actions.SUBMIT_POST_REQUEST });
    try {
      const response = await axios.post(
        '/api/submit-post',
        {
          title,
          description,
          value: Number(value)
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

// export function fetchPostData(slugId) {
//   return async (dispatch, getState) => {
//     try {
//       const { data } = await axios.get(`/api/post/${slugId}`);

//       return dispatch({
//         type: actions.POST_DATA_RECEIVED,
//         payload: data
//       });
//     } catch (e) {}
//   };
// }
