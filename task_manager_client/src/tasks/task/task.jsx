import React, {Component} from 'react';
import {Duration} from 'luxon';
import styled from '@emotion/styled/macro';
import Button from '@material-ui/core/Button';
import mapValues from 'lodash/mapValues';
import api from '../../api';
import Form from "../../common/components/form";
import getUserName from "../../common/utils/get-user-name";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  margin-top: 1rem;
  margin-bottom: -1rem;
`;

export default class Task extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.componentDidUpdate();
    const {users, usersLoaded} = this.props;
    if (!(users && Object.values(users)))
      api.getUsers().then(({data}) => usersLoaded(data));
  }

  componentDidUpdate() {
    const {taskId, task} = this.props;
    if (taskId && !task)
      this.fetchTask();
  }

  fetchTask() {
    const {taskId, gotTask} = this.props;
    api
      .getTask(taskId)
      .then(({data}) => gotTask(data))
      .catch(console.error);
  }

  async updateTask(data) {
    const sendData = Object.assign({}, data);
    try {
      if (sendData.timeWorked && sendData.timeWorked.match(/\d\d:\d\d/g)) {
        const [hours, minutes] = sendData.timeWorked.split(':');
        sendData.timeWorked = ((hours * 60) + minutes) * 60;
      } else {
        delete sendData.timeWorked;
      }
      const {data: task} = await api.updateTask(this.props.taskId, sendData);
      this.props.gotTask(task);
    } catch (e) {
      throw e.statusText;
    }
  }

  async deleteTask() {
    try {
      await api.deleteTask(this.props.task.id);
      this.props.history.push('/tasks');
    } catch (e) {
      throw e.statusText;
    }
  }

  async work15More() {
    const {task, gotTask} = this.props;
    try {
      const {data} = await api.updateTask(task.id, {
        timeWorked: Number(task.timeWorked) + (15 * 60)
      });
      gotTask(data);
    } catch (e) {
      console.error(e.statusText)
    }
  }

  async work15Less() {
    const {task, gotTask} = this.props;
    try {
      const {data} = await api.updateTask(task.id, {
        timeWorked: Number(task.timeWorked) - (15 * 60)
      });
      gotTask(data);
    } catch (e) {
      console.error(e.statusText)
    }
  }

  async toggleCompleteTask() {
    const {task, gotTask} = this.props;
    try {
      const {data} = await api.updateTask(task.id, {
        completed: !task.completed
      });
      gotTask(data);
    } catch (e) {
      console.error(e.statusText)
    }
  }

  render() {
    const {task, currentUserId, users} = this.props;
    if (!task) return null;

    const fields = {
      title: {
        label: {
          title: 'Title',
          required: true
        },
        type: 'text'
      },
      description: {
        label: 'Description',
        type: 'text'
      },
      completed: {
        label: 'Done?',
        type: 'boolean',
        disableUnderline: true
      },
      timeWorked: {
        label: 'Time Spent',
        type: 'text'
      },
      userId: {
        label: 'User',
        type: 'select',
        options: mapValues(users, getUserName)
      }
    };

    return (
      <Container>
        <Header>
          <Button
            disabled={task.userId !== currentUserId}
            onClick={() => this.work15More()}
          >
            Add 15 of Work
          </Button>
          <Button
            disabled={task.userId !== currentUserId}
            onClick={() => this.work15Less()}
          >
            Subtract 15 of Work
          </Button>
          <Button
            disabled={task.userId !== currentUserId}
            onClick={() => this.toggleCompleteTask()}
          >
            {task.completed ? 'Re-Open Task' : 'Complete Task'}
          </Button>
        </Header>
        <Form
          title={task.title}
          fields={fields}
          initialData={{
            ...task,
            timeWorked: Duration.fromMillis(task.timeWorked * 1000).toFormat('hh:mm')
          }}
          submitLabel="Update"
          disabled={task.userId !== currentUserId}
          allowView
          allowDelete
          handleDelete={() => this.deleteTask()}
          onSubmit={data => this.updateTask(data)}
        />
      </Container>
    );
  }
}