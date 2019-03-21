import {connect} from 'react-redux';
import Register from './register';
import {loggedIn} from '../api';
import {gotUser} from '../users';

export default connect(undefined, {gotUser, loggedIn})(Register);
