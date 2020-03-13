import update from 'immutability-helper';
import actions from '../actions/actionTypes';
import { initializeAuthState } from '../utils/authUtils';

const initialState = initializeAuthState();

const auth = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.LOGIN_SUCCESS: {
      return update(state, {
        loggedIn: { $set: true },
        user: { $set: payload.user },
        token: { $set: payload.token },
        ui: {
          loginRequesting: { $set: false }
        }
      });
    }
    case actions.USER_BALANCE_RECEIVED: {
      console.log('user balance', payload.balance);
      return update(state, {
        user: {
          balance: { $set: payload.balance }
        }
      });
    }
    case actions.LOGOUT: {
      return initializeAuthState();
    }
  }
  return state;
};

export default auth;
