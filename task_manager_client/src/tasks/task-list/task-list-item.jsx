import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import styled from '@emotion/styled/macro';
import {getUser} from "../../users";
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

function TaskListItem({task, user}) {
  return (
    <ItemContainer>
      <Link to={`/tasks/${task.id}`}>
        <Item>
          <div>Title: {task.title}</div>
          <div>Completed: {task.completed ? "✓" : "X"}</div>
          <div>User: {getUserName(user)}</div>
        </Item>
      </Link>
    </ItemContainer>
  );
}

const mapStateToProps = (state, props) => ({
  user: getUser(state, props.task.userId)
});

export default connect(mapStateToProps)(TaskListItem);