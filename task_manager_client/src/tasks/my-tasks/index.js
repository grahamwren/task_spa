import {connect} from 'react-redux';
import MyTasks from './my-tasks';
import {getTasksForUserId} from '../selectors';
import {someTasksLoaded} from '../actions';
import {getCurrentUserId} from '../../api';

const mapStateToProps = state => {
  const currentUserId = getCurrentUserId(state);
  return {
    currentUserId,
    tasks: Object.values(getTasksForUserId(state, currentUserId) || {})
  }
};

export default connect(mapStateToProps, {tasksLoaded: someTasksLoaded})(MyTasks);