import {connect} from 'react-redux';
import UserList from './user-list';
import {getUsers} from "../selectors";
import {usersLoaded} from '../actions';

const mapStateToProp = state => ({
  users: Object.values(getUsers(state) || {})
});

export default connect(mapStateToProp, {usersLoaded})(UserList);