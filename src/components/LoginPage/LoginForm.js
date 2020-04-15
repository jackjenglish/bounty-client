import React, { Component } from 'react';
import cx from 'classnames';
import styles from './LoginForm.scss';
import { Redirect } from 'react-router-dom';
import ProfileIcon from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import { Link } from 'react-router-dom';
import axios from 'axios';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.submit = this.submit.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);
  }

  validateStyle(field) {
    const fields = this.props.validatedFields;
    // console.log(fields);
    const validated = fields[field];
    if (validated == null) return {};
    if (validated) {
      return { border: '1px solid #339966' };
    } else {
      return { border: '1px solid #e03c14' };
    }
  }

  onFieldChange(evt) {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  }

  submit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.submitLogin(email, password);
  }

  render() {
    const {
      props: { loggedIn, validate },
      state
    } = this;

    if (loggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <form onSubmit={this.submit}>
        <div className={styles.root}>
          <div className={styles.title}>Login</div>
          <div
            className={styles.inputRow}
            // style={this.validateStyle("email")}
          >
            <EmailIcon
              style={{
                fontSize: '28px',
                cursor: 'pointer',
                marginLeft: '0.25rem',
                color: '#444'
              }}
            />
            <input
              className={styles.inputForm}
              placeholder="Email"
              onChange={this.onFieldChange}
              onBlur={validate}
              name="email"
              value={state.email}
              type="text"
            />
          </div>

          <div
            className={styles.inputRow}
            // style={this.validateStyle("password")}
          >
            <LockIcon
              style={{
                fontSize: '28px',
                cursor: 'pointer',
                marginLeft: '0.25rem',
                color: '#444'
              }}
            />
            <input
              className={styles.inputForm}
              placeholder="Password"
              onChange={this.onFieldChange}
              onBlur={validate}
              name="password"
              value={state.password}
              type="password"
            />
          </div>

          <div
          // className={cx(styles.error, {
          //   [styles.show]: this.props.error.length > 0
          // })}
          >
            {this.props.error}
          </div>

          {/* <Link to="forgot" className={styles.forgotPassword}>
            Forgot your password?
          </Link> */}
        </div>
        <div className={styles.footerControls}>
          <input type="submit" className={styles.button} value="Login" />
        </div>
      </form>
    );
  }
}

export default LoginForm;
