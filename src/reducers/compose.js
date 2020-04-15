import actions from '../actions/actionTypes';
import update from 'immutability-helper';

const initialState = {
  title: '',
  description: '',
  value: 0,
  postCreated: false,
  submitRequesting: false,
  selectedTopics: [],
  topics: []
};

const compose = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.UPDATE_COMPOSE_FIELD: {
      const { field, value } = payload;

      return update(state, {
        [field]: { $set: value }
      });
    }
    case actions.SUBMIT_POST_REQUEST: {
      return update(state, {
        submitRequesting: { $set: true }
      });
    }
    case actions.SUBMIT_POST_SUCCESS: {
      return update(state, {
        postCreated: { $set: true },
        createdId: { $set: payload.slugId }
      });
    }
    case actions.TOPICS_RECEIVED: {
      return update(state, {
        topics: { $set: payload }
      });
    }
  }
  return state;
};

export default compose;
