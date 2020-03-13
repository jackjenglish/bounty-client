import axios from 'axios';
import actions from './actionTypes';
import jwtHeader from '../utils/jwtHeader';
import simpleAction from './simpleAction';

export function fetchProfile(slugId) {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/profile/${slugId}`, {
        headers: jwtHeader()
      });
      console.log('fetched');
      return dispatch({
        type: actions.PROFILE_DATA_RECEIVED,
        payload: data
      });
    } catch (e) {}
  };
}

export function editProfile(data) {
  return async (dispatch, getState) => {
    const { profile, auth } = getState().profile;
    console.log('save field ', data);

    dispatch({
      type: actions.EDIT_PROFILE_REQUEST,
      payload: data
    });

    try {
      const res = await axios.post(
        '/api/profile/edit',
        {
          profileId: profile._id,
          data
        },
        {
          headers: jwtHeader()
        }
      );

      console.log('success dispatching', res);
      return dispatch({
        type: actions.EDIT_PROFILE_SUCCESS,
        payload: data
      });
    } catch (e) {
      console.log('err', e);
    }
  };
}

export function uploadProfileImage(selectedFile) {
  return async (dispatch, getState) => {
    console.log('upload image');
    dispatch({ type: actions.UPLOAD_PROFILE_IMAGE_REQUEST });
    const formData = new FormData();
    formData.append('file', selectedFile);
    try {
      const response = await axios.post('/api/uploadProfileImage', formData, {
        headers: jwtHeader()
      });
      const { data } = response;
      dispatch({
        type: actions.UPLOAD_PROFILE_IMAGE_SUCCESS,
        payload: data.path
      });
    } catch (e) {
      console.log('saveChanges error', e);
    }
  };
}

// export const onClickEditBio = simpleAction(actions.CLICK_EDIT_BIO);
