import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ProfilePage from '../components/ProfilePage/ProfilePage';
import {
  fetchProfile,
  editProfile,
  uploadProfileImage
} from '../actions/profileActions';

function mapStateToProps({ profile, auth }) {
  return {
    profile: profile.profile,
    fieldsUpdating: profile.ui.fieldsUpdating,
    profoUploading: profile.ui.profoUploading,
    loading: profile.loading,
    loggedIn: auth.loggedIn,
    user: auth.user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchProfile,
      editProfile,
      uploadProfileImage
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePage);
