import {connect} from 'react-redux';
import User from './user';
import {gotUser} from '../actions';
import {getUser, getCurrentUser} from '../selectors';

const mapStateToProps = (state, props) => ({
  user: getUser(state, props.userId),
  currentUser: getCurrentUser(state)
});

export default connect(mapStateToProps, {gotUser})(User);