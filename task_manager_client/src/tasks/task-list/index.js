import {connect} from 'react-redux';
import TaskList from './task-list';
import {usersLoaded} from "../../users";

export default connect(undefined, {usersLoaded})(TaskList);
