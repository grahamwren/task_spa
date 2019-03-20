import React, {Component} from 'react';

import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

import {LoginContainer, FormField} from "./theme";
import api from '../api';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async loginUser() {
    try {
      const {data} = await api.login(this.state.email, this.state.password);
      this.props.loggedIn(data);
    } catch (error) {
      console.error(error);
      this.setState({...this.state, error});
    }
  }

  render() {
    const emailInputField =
      <Input
        type="email"
        name="email"
        autoComplete="email"
        onChange={ev => this.setState({...this.state, email: ev.target.value})}
      />;

    const passwordInputField =
      <Input
        type="password"
        name="password"
        autoComplete="current-password"
        onChange={ev => this.setState({...this.state, password: ev.target.value})}
      />;

    return (
      <LoginContainer onSubmit={ev =>
        ev.preventDefault() ||
        this.loginUser()
      }>
        <FormField>
          <InputLabel>Email</InputLabel>
          {emailInputField}
        </FormField>
        <FormField>
          <InputLabel>Password</InputLabel>
          {passwordInputField}
        </FormField>
        <Button type="submit">Login</Button>
      </LoginContainer>
    );
  }
}