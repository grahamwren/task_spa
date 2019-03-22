import React, {PureComponent} from 'react';
import styled from '@emotion/styled/macro';
import {Link} from 'react-router-dom';
import api from '../../api';
import Button from '@material-ui/core/Button';
import TaskListItem from './task-list-item';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  padding-top: 1rem;
  padding-right: 2rem;
  justify-content: flex-end;
`;

const Tasks = styled.div`
  margin: 0 2rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export default class TaskList extends PureComponent {
  componentDidMount() {
    api.getUsers()
      .then(({data}) => this.props.usersLoaded(data))
  }

  render() {
    const items = this.props.tasks.map(task => <TaskListItem task={task} key={task.id}/>);
    return (
      <Container>
        <Header>
          <Link to="/new-task">
            <Button>New Task</Button>
          </Link>
        </Header>
        <Tasks>
          {items}
        </Tasks>
      </Container>
    );
  }
}