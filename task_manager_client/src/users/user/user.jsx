import React, {Component} from 'react';
import styled from '@emotion/styled/macro';
import api from '../../api';
import Form from "../../common/components/form";
import getUserName from "../../common/utils/get-user-name";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
`;

export default class User extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    const {userId, user} = this.props;
    if (userId && !user)
      this.fetchUser();
  }

  fetchUser() {
    const {userId, gotUser} = this.props;
    api
      .getUser(userId)
      .then(({data}) => gotUser(data))
      .catch(console.error);
  }

  async updateUser(data) {
    try {
      const {data: user} = await api.updateUser(this.props.userId, data);
      this.props.gotUser(user);
    }catch (e) {
      throw e.statusText;
    }
  }

  render() {
    const {user, currentUser} = this.props;
    if (!user) return null;

    const fields = {
      firstName: {
        label: 'First Name',
        type: 'name',
        autoComplete: 'fName',
        placeholder: 'Alex',
        value: user.firstName
      },
      lastName: {
        label: 'Last Name',
        type: 'name',
        autoComplete: 'lName',
        placeholder: 'Smith',
        value: user.lastName
      },
      email: {
        label: {
          title: 'Email',
          required: true
        },
        type: 'email',
        autoComplete: 'username',
        placeholder: 'alex.smith@gmail.com',
        value: user.email
      },
      password: {
        label: {
          title: 'Password',
          required: true
        },
        type: 'password',
        autoComplete: 'new-password'
      }
    };

    return (
      <Container>
        <Form
          title={getUserName(user)}
          fields={fields}
          submitLabel="Update"
          disabled={user.id !== currentUser.id}
          allowView={true}
          onSubmit={data => this.updateUser(data)}
        />
      </Container>
    );
  }
}