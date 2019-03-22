import {connect} from 'react-redux';
import AllTasks from './all-tasks';
import {getTasks} from '../selectors';
import {tasksLoaded} from '../actions';

const mapStateToProps = state => ({
  tasks: Object.values(getTasks(state) || {})
});

export default connect(mapStateToProps, {tasksLoaded})(AllTasks);