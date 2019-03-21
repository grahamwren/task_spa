import {connect} from 'react-redux';
import Register from './register';
import {loggedIn} from '../api';
import {newUser} from '../users';

export default connect(undefined, {newUser, loggedIn})(Register);
