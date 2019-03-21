import {connect} from 'react-redux';
import UserList from './user-list';
import {getUsers} from "../selectors";

const mapStateToProp = state => ({
  users: Object.values(getUsers(state) || {})
});

export default connect(mapStateToProp)(UserList);