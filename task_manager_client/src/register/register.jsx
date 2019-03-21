import React, {PureComponent} from 'react';
import api from '../api';
import Form from '../common/components/form';
import {RegisterContainer} from './theme';

export default class Register extends PureComponent {
  constructor(props) {
    super(props);
  }

  async registerUser(data) {
    try {
      const {data: newUser} = await api.createUser(data);
      this.props.newUser(newUser);
      const {data: sessionData} = await api.loginUser(newUser.email, data.password);
      this.props.loggedIn(sessionData);
      this.props.history.push('/');
    } catch (e) {
      throw e.statusText;
    }
  }

  render() {
    const fields = {
      firstName: {
        label: 'First Name',
        type: 'name',
        autoComplete: 'fName',
        placeholder: 'Alex'
      },
      lastName: {
        label: 'Last Name',
        type: 'name',
        autoComplete: 'lName',
        placeholder: 'Smith'
      },
      email: {
        label: {
          title: 'Email',
          required: true
        },
        type: 'email',
        autoComplete: 'username',
        placeholder: 'alex.smith@gmail.com'
      },
      password: {
        label: {
          title: 'Password',
          required: true
        },
        type: 'password',
        autoComplete: 'new-password'
      }
    };
    return (
      <RegisterContainer>
        <Form
          title="Register"
          fields={fields}
          submitLabel="Register"
          onSubmit={data => this.registerUser(data)}
        />
      </RegisterContainer>
    );
  }
}