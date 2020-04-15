import React, { Component } from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './LoginForm.scss';
import { submitSignup } from '../../actions/authActions';
import ProfileIcon from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';

const mapStateToProps = ({ signup }) => {
  return {};
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      submitSignup
    },
    dispatch
  );

function validatePassword() {}
function validateField(form, name) {
  switch (name) {
    case 'name': {
      return form[name].length > 0;
    }
    case 'email': {
      const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
      return RegExp(emailRegex).test(form[name]);
    }
    case 'password': {
      return form[name].length >= 6;
    }
    case 'confirmPassword': {
      return form[name].length >= 6 && form.password == form[name];
    }
  }
}

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      validation: {}
    };

    this.updateField = this.updateField.bind(this);
    this.submit = this.submit.bind(this);
  }

  validateStyle(field) {
    const validated = this.state.validation[field];
    if (validated == null) return {};
    if (validated) {
      return { border: '1px solid #339966' };
    } else {
      return { border: '1px solid #e03c14' };
    }
  }

  validate(field) {
    const form = this.state.form;
    if (['password', 'confirmPassword'].includes(field)) {
      const validatedPassword = validateField(form, 'password');
      const validatedConfirm = validateField(form, 'confirmPassword');
      this.setState(prevState => ({
        validation: {
          ...prevState.validation,
          password: validatedPassword,
          confirmPassword: validatedConfirm
        }
      }));
    } else {
      const validated = validateField(form, field);
      this.setState(prevState => ({
        validation: { ...prevState.validation, [field]: validated }
      }));
    }
  }

  submit(e) {
    e.preventDefault();
    const { form, validation } = this.state;

    for (let field in form) {
      if (!validation[field]) {
        return this.setState({ error: 'Error in signup form' });
      }
    }

    console.log('SUBMITTING', form);
    this.props.submitSignup(form);
  }

  updateField(evt) {
    const {
      target: { value, name }
    } = evt;

    this.setState(
      prevState => ({
        form: { ...prevState.form, [name]: value }
      }),
      () => this.validate(name)
    );
  }

  render() {
    const { form } = this.state;
    return (
      <form onSubmit={this.submit}>
        <div className={styles.root}>
          <div className={styles.title}>Create Account</div>

          <div className={styles.inputRow} style={this.validateStyle('name')}>
            <ProfileIcon
              style={{
                fontSize: '28px',
                cursor: 'pointer',
                marginLeft: '0.25rem',
                color: '#444'
              }}
            />
            <input
              className={styles.inputForm}
              placeholder="Full Name"
              onChange={this.updateField}
              // onBlur={thivalidate}
              name="name"
              value={form.name}
              type="text"
            />
          </div>

          <div className={styles.inputRow} style={this.validateStyle('email')}>
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
              onChange={this.updateField}
              // onBlur={validate}
              name="email"
              value={form.email}
              type="text"
            />
          </div>

          <div
            className={styles.inputRow}
            style={this.validateStyle('password')}
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
              onChange={this.updateField}
              // onBlur={validate}
              name="password"
              value={form.password}
              type="password"
            />
          </div>

          <div
            className={styles.inputRow}
            style={this.validateStyle('confirmPassword')}
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
              placeholder="Confirm Password"
              type="password"
              onChange={this.updateField}
              // onBlur={validate}
              name="confirmPassword"
              value={form.confirmPassword}
            />
          </div>
          <div
            className={cx(styles.error, {
              [styles.show]: this.state.error
            })}
          >
            {this.state.error}
          </div>
          <div className={styles.disclaimer}>
            By creating an account you agree to our Terms of Service and Privacy
            Policy
          </div>
        </div>
        <div className={styles.footerControls}>
          <input type="submit" className={styles.button} value="Sign Up" />
        </div>
      </form>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpForm);
