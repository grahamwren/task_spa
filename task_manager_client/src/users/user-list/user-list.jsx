import React, {PureComponent} from 'react';
import styled from '@emotion/styled/macro';
import UserListItem from './user-list-item';
const Users = styled.div`
  margin: 0 2rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export default class UserList extends PureComponent {
  render() {
    const items = this.props.users.map(user => <UserListItem user={user} key={user.id}/>);
    return (
      <Users>
        {items}
      </Users>
    );
  }
}