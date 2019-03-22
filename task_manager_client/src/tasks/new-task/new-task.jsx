import React, {PureComponent} from 'react';
import styled from '@emotion/styled/macro';
import mapValues from 'lodash/mapValues';
import Form from "../../common/components/form";
import api from '../../api';
import getUserName from "../../common/utils/get-user-name";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
`;

export default class NewTask extends PureComponent {
  componentDidMount() {
    const {users, usersLoaded} = this.props;
    if (!(users && Object.values(users)))
      api.getUsers().then(({data}) => usersLoaded(data));
  }

  async createTask(data) {
    try {
      if (data.timeWorked) {
        const [hours, minutes] = data.timeWorked.split(':');
        data.timeWorked = ((hours * 60) + minutes) * 60;
      }
      const task = await api.createTask(data);
      this.props.gotTask(task);
      this.props.history.push('/tasks');
    } catch (e) {
      throw e.statusMessage;
    }
  }

  render() {
    const {currentUserId, users} = this.props;
    const fields = {
      title: {
        label: {
          title: 'Title',
          required: true
        },
        type: 'text',
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
          initialData={{
            completed: false,
            timeWorked: '00:00',
            userId: currentUserId
          }}
          title="New Task"
          fields={fields}
          submitLabel="Create"
          onSubmit={data => this.createTask(data)}
        />
      </Container>
    );
  }
}
