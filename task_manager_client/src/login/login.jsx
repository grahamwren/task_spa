import React, {PureComponent} from 'react';
import Form from '../common/components/form';
import {LoginContainer} from "./theme";
import api from '../api';

export default class Login extends PureComponent {
  constructor(props) {
    super(props);
  }

  async loginUser({email, password}) {
    try {
      const {data} = await api.loginUser(email, password);
      this.props.loggedIn(data);
      this.props.history.push('/');
    } catch (error) {
      throw error.statusText;
    }
  }

  render() {
    const formFields = {
      email: {
        label: 'Email',
        type: 'email',
        autoComplete: 'username'
      },
      password: {
        label: 'Password',
        type: 'password',
        autoComplete: 'current-password'
      }
    };

    return (
      <LoginContainer>
        <Form
          title="Login"
          fields={formFields}
          submitLabel="Login"
          onSubmit={data => this.loginUser(data)}
        />
      </LoginContainer>
    );
  }
}