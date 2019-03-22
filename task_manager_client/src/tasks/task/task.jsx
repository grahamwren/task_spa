import React, {Component} from 'react';
import {Duration} from 'luxon';
import styled from '@emotion/styled/macro';
import mapValues from 'lodash/mapValues';
import api from '../../api';
import Form from "../../common/components/form";
import getUserName from "../../common/utils/get-user-name";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
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
    try {
      if (data.timeWorked) {
        const [hours, minutes] = data.timeWorked.split(':');
        data.timeWorked = ((hours * 60) + minutes) * 60;
      }
      const {data: task} = await api.updateTask(this.props.taskId, data);
      this.props.gotTask(task);
    } catch (e) {
      throw e.statusText;
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
        <Form
          title={task.title}
          fields={fields}
          initialData={{
            ...task,
            timeWorked: Duration.fromMillis(task.timeWorked * 1000).toFormat('hh:mm')
          }}
          submitLabel="Update"
          disabled={task.user_id !== currentUserId}
          allowView={true}
          onSubmit={data => this.updateTask(data)}
        />
      </Container>
    );
  }
}