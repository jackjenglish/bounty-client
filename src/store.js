/* eslint no-undef: 0, no-underscore-dangle: 0 */
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import feedReducer from './reducers/feed';
import postReducer from './reducers/post';
import authReducer from './reducers/auth';
import composeReducer from './reducers/compose';
import profileReducer from './reducers/profile';
import feedbackBarReducer from './reducers/feedbackBar';
import reportsReducer from './reducers/reports';

const reducers = combineReducers({
  feed: feedReducer,
  post: postReducer,
  auth: authReducer,
  compose: composeReducer,
  profile: profileReducer,
  feedback: feedbackBarReducer,
  reports: reportsReducer
});

const store = createStore(reducers, compose(applyMiddleware(thunk)));

export default store;
