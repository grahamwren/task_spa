import React, {PureComponent} from 'react';
import api from '../../api';
import TaskList from '../task-list';

export default class MyTasks extends PureComponent {
  componentDidMount() {
    api.getTasksForUser(this.props.currentUserId)
      .then(({data}) => this.props.someTasksLoaded(data))
      .catch(console.error)
  }

  render() {
    return <TaskList {...this.props}/>;
  }
}