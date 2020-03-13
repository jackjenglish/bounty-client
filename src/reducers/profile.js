import actions from '../actions/actionTypes';
import update from 'immutability-helper';

const initialState = {
  profile: null,
  loading: true,
  ui: {
    fieldsUpdating: {}
  }
};

const profile = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.PROFILE_DATA_RECEIVED: {
      return update(state, {
        loading: { $set: false },
        profile: { $set: payload }
      });
    }
    case actions.EDIT_PROFILE_REQUEST: {
      const fieldsUpdating = {};
      for (let field in payload) {
        fieldsUpdating[field] = { $set: true };
      }
      console.log('edit pro request', fieldsUpdating);
      return update(state, {
        ui: {
          fieldsUpdating
        }
      });
    }
    case actions.EDIT_PROFILE_SUCCESS: {
      const fieldsUpdating = {};
      const profileChanges = {};
      for (let field in payload) {
        fieldsUpdating[field] = { $set: false };
        profileChanges[field] = { $set: payload[field] };
      }
      console.log('edit pro success', fieldsUpdating, profileChanges);

      return update(state, {
        profile: profileChanges,
        ui: {
          fieldsUpdating
        }
      });
    }
    case actions.UPLOAD_PROFILE_IMAGE_REQUEST: {
      return update(state, {
        ui: {
          profoUploading: { $set: true }
        }
      });
    }
    case actions.UPLOAD_PROFILE_IMAGE_SUCCESS: {
      return update(state, {
        ui: {
          profoUploading: { $set: false }
        },
        profile: {
          profileImgSrc: { $set: payload }
        }
      });
    }
  }
  return state;
};

export default profile;
