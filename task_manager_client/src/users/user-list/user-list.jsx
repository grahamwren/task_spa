import React, {PureComponent} from 'react';
import styled from '@emotion/styled/macro';
import api from '../../api';
import UserListItem from './user-list-item';
const Users = styled.div`
  width: 80%;
  margin: 0 2rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export default class UserList extends PureComponent {
  componentDidMount() {
    api.getUsers()
      .then(({data}) => this.props.usersLoaded(data))
      .catch(console.error)
  }

  render() {
    const items = this.props.users.map(user => <UserListItem user={user} key={user.id}/>);
    return (
      <Users>
        {items}
      </Users>
    );
  }
}