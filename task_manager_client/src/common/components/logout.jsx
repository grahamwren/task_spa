import React, {Component} from 'react';
import {connect} from 'react-redux';
import {logoutUser} from '../../api';

class Logout extends Component {
  componentDidMount() {
    this.props.logoutUser();
    this.props.history.push('/');
  }

  render() {
    return null;
  }
}
export default connect(undefined, {logoutUser})(Logout);
