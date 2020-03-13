import React, { Component } from 'react';
import styled from 'styled-components';
import Colors from '../styles/Colors';
import { withRouter, Redirect } from 'react-router-dom';

const LoginPageContainer = styled.div``;

const PostContainer = styled.div`
  padding: 12px 12px 8px 12px;
  border: 1px solid #efefef;
  border-radius: 4px;
  margin-bottom: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

const LoginFormContainer = styled.div`
  width: 330px;
  margin: 0 auto;
  padding: 1em;
  border: 1px solid rgba(34, 34, 34, 0.2);
  border-radius: 4px;
  color: #37352f;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
`;

const H2 = styled.div`
  color: #37352f;
  font-weight: 500;
  font-size: 24px;
  border-bottom: 2px solid rgba(34, 34, 34, 0.2);
  margin-bottom: 0.5em;
`;

const FormBody = styled.div``;

const InputContainer = styled.div`
  margin-bottom: 0.5em;
`;

const Input = styled.input`
  padding: 8px 10px;
  border: 1px solid rgba(34, 34, 34, 0.2);
  border-radius: 4px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
`;

const SubmitButton = styled.div`
  cursor: pointer;
  background: hsl(200, 96%, 90%);
  display: inline-block;
  padding: 8px 14px;
  border-radius: 4px;
  color: hsl(205, 100%, 21%);
  font-weight: 500;

  &:hover {
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.onFieldChange = this.onFieldChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onFieldChange(evt) {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  }

  onSubmit() {
    const { email, password } = this.state;
    this.props.submitLogin(email, password);
  }

  render() {
    const {
      ui: { loginRequesting },
      loggedIn
    } = this.props;

    if (loggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <LoginPageContainer>
        <LoginFormContainer>
          <H2>Login</H2>
          <FormBody>
            <InputContainer>
              <Input
                name="email"
                type="text"
                placeholder="Email"
                value={this.state.email}
                onChange={this.onFieldChange}
              />
            </InputContainer>

            <InputContainer>
              <Input
                name="password"
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.onFieldChange}
              />
            </InputContainer>
          </FormBody>
          <SubmitButton onClick={this.onSubmit}> Login</SubmitButton>
        </LoginFormContainer>
      </LoginPageContainer>
    );
  }
}

export default LoginPage; //withRouter(LoginPage);
