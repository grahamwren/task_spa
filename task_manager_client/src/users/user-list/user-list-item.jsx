import React from 'react';
import {Link} from 'react-router-dom';
import styled from '@emotion/styled/macro';
import getUserName from "../../common/utils/get-user-name";

const ItemContainer = styled.div`
  margin: 0.5rem;
`;

const Item = styled.div`
  padding: 0.5rem;
  border: grey solid 1px;
  border-radius: 1rem;
  height: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  & > * {
    margin-bottom: 0.5rem;
  }
`;

export default function UserListItem({user}) {
  const userName = getUserName(user, false);
  return (
    <ItemContainer>
      <Link to={`/users/${user.id}`} as='div'>
        <Item>
          <div>Name: {userName}</div>
          <div>Email: {user.email}</div>
        </Item>
      </Link>
    </ItemContainer>
  );
}