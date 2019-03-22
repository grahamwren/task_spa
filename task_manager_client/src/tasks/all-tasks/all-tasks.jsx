import React, {PureComponent} from 'react';
import api from '../../api';
import TaskList from '../task-list';

export default class AllTasks extends PureComponent {
  componentDidMount() {
    api.getTasks()
      .then(({data}) => this.props.tasksLoaded(data))
      .catch(console.error)
  }

  render() {
    return <TaskList {...this.props}/>;
  }
}