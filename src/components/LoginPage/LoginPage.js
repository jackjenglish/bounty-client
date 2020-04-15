import React, { Component } from 'react';
import cx from 'classnames';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './LoginPage.scss';
// import { submitLogin } from '../../redux/reducers/auth';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
// import queryString from 'query-string';
import { submitLogin } from '../../actions/authActions';

function mapStateToProps({ login, auth }) {
  return {
    loggedIn: auth.loggedIn
    //loading: auth.ui.loading,
    //error: auth.ui.error
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

class LoginPage extends Component {
  constructor(props) {
    super(props);

    let activeTab = 'login';

    // const values = queryString.parse(this.props.location.search);
    ///const type = values.type;
    // if (type) activeTab = type;

    this.state = {
      activeTab
    };
  }

  render() {
    const { state, props } = this;
    const { loggedIn } = props;
    console.log('login page', props);

    if (loggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <div className={cx('container', styles.root)}>
        <div className={styles.tabs}>
          <div
            className={cx(styles.tab, {
              [styles.activeTab]: state.activeTab === 'login'
            })}
            onClick={() => this.setState({ activeTab: 'login' })}
          >
            Login
          </div>
          <div
            className={cx(styles.tab, {
              [styles.activeTab]: state.activeTab === 'signup'
            })}
            onClick={() => this.setState({ activeTab: 'signup' })}
          >
            Sign Up
          </div>
        </div>
        {state.activeTab === 'login' ? (
          <LoginForm
            submitLogin={this.props.submitLogin}
            // failedLogin={this.props.failedLogin}
            // error={props.error}
          />
        ) : (
          <SignUpForm />
        )}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
