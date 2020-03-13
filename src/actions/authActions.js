import axios from 'axios';
import simpleAction from './simpleAction';
import actions from './actionTypes';
import { setLocalAuthData, clearLocalAuthData } from '../utils/authUtils';
import jwtHeader from '../utils/jwtHeader';

export const updateFormField = simpleAction(actions.UPDATE_FORM_FIELD);

// loginRequest
export function submitLogin(email, password) {
  return async dispatch => {
    dispatch({ type: actions.LOGIN_REQUEST });

    try {
      const response = await axios.post('/api/login', {
        email,
        password
      });

      setLocalAuthData(response.data);

      dispatch({
        type: actions.LOGIN_SUCCESS,
        payload: response.data
      });
    } catch (e) {
      console.log('caught', e);
    }
  };
}

export function fetchUserBalance() {
  return async dispatch => {
    try {
      console.log('fetch user balance');
      const response = await axios.get('/api/profile/balance', {
        headers: jwtHeader()
      });

      dispatch({
        type: actions.USER_BALANCE_RECEIVED,
        payload: response.data
      });
    } catch (e) {
      console.log('caught', e);
    }
  };
}

export function logout() {
  return dispatch => {
    clearLocalAuthData();
    dispatch({ type: actions.LOGOUT });
  };
}
