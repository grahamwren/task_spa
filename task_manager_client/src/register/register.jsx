import React, {Component} from 'react';
import api from '../api';
import {RegisterContainer, FormField} from './theme';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  registerUser() {
    const data = {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    };
    api.createUser(data)
      .then(({data: newUser}) => {
        this.props.newUser(newUser);
        return api.loginUser(newUser.email, data.password);
      })
      .then(({data}) => {
        this.props.loggedIn(data)
      })
      .catch(console.error);
  }

  getHandleUpdate(field) {
    return (ev) => {
      ev.preventDefault();
      const newVal = ev.target.value;
      this.setState({...this.state, [field]: newVal})
    }
  }

  render() {
    return (
      <RegisterContainer>

      </RegisterContainer>
    );
  }
}