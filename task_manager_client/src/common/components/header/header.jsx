import React, {PureComponent} from 'react';
import styled from '@emotion/styled/macro';
import {Link} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import api from '../../../api';
import getUserName from '../../utils/get-user-name';

const NavBar = styled.div`
  display: flex;
  width: 100%;
`;

const LeftItems = styled.div`
  & > * {
    margin-left: 1rem;
  }
`;

const RightItems = styled.div`
  margin-left: auto;
  & > * {
    margin-left: 1rem;
  }
`;

const authenticateContent = user => (
  <NavBar>
    <LeftItems>
      <Link to="/users">Users</Link>
    </LeftItems>
    <RightItems>
      <Link to={`/users/${user.id || user}`}>{getUserName(user)}</Link>
      <Link to="/logout">Logout</Link>
    </RightItems>
  </NavBar>
);
const unauthenticatedContent = (
  <NavBar>
    <RightItems>
      <Link to="/login">Login</Link>
    </RightItems>
  </NavBar>
);

export default class Header extends PureComponent {
  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    const {currentUser, currentUserId, usersLoaded} = this.props;
    if (currentUserId && !currentUser) {
      api.getUsers()
        .then(({data}) => usersLoaded(data))
        .catch(console.error)
    }
  }

  render() {
    const {currentUser, currentUserId} = this.props;
    return (
      <AppBar position="static">
        <Toolbar>
          <Link to="/">
            <Typography variant="title" color="inherit">
              Productivity
            </Typography>
          </Link>
          {currentUserId && authenticateContent(currentUser || currentUserId)}
          {!currentUserId && unauthenticatedContent}
        </Toolbar>
      </AppBar>
    );
  }
}