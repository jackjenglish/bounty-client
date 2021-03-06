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

// export const validateCreateAccount = simpleAction(VALIDATE_CREATE_ACCOUNT);
// export const signupFailure = simpleAction(VALIDATE_CREATE_ACCOUNT);

export function submitSignup(signupForm) {
  return async (dispatch, getState) => {
    // dispatch({ type: SIGNUP_REQUEST });

    const { name, email, password, confirmPassword } = signupForm;
    console.log('signing up');

    try {
      const response = await axios.post('/api/signup', {
        name,
        email,
        password
      });

      console.log(
        'submit signup response:\n',
        'status ',
        response.status,
        '\ndata: ',
        response.data
      );

      const authData = response.data;

      localStorage.setItem('authData', JSON.stringify(authData));

      dispatch({
        type: actions.LOGIN_SUCCESS,
        payload: authData
      });
      // dispatch(push('/menu'));
    } catch (e) {
      console.log('signup submit fail', e);
      //return dispatch(loginFailure('Something went wrong'))
    }
  };
}

export function logout() {
  return dispatch => {
    clearLocalAuthData();

    dispatch({ type: actions.LOGOUT });
  };
}
