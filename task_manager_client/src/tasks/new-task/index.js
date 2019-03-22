import {connect} from 'react-redux';
import NewTask from './new-task';
import {gotTask} from '../actions';
import {getUsers, usersLoaded} from '../../users';
import {getCurrentUserId} from '../../api';

const mapStateToProps = state => ({
  currentUserId: getCurrentUserId(state),
  users: getUsers(state)
});

export default connect(mapStateToProps, {gotTask, usersLoaded})(NewTask);