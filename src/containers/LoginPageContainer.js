import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoginPage from '../components/PostPage/LoginPage';
import { submitLogin } from '../actions/authActions';

function mapStateToProps({ auth }) {
  return {
    loggedIn: auth.loggedIn,
    ui: auth.ui
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      submitLogin
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
