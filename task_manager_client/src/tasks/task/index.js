import {connect} from 'react-redux';
import Task from './task';
import {getUsers, usersLoaded} from '../../users';
import {gotTask} from '../actions';
import {getTask} from '../selectors';
import {getCurrentUserId} from '../../api';

const mapStateToProps = (state, props) => ({
  task: getTask(state, props.taskId),
  currentUserId: getCurrentUserId(state),
  users: getUsers(state)
});

export default connect(mapStateToProps, {gotTask, usersLoaded})(Task);