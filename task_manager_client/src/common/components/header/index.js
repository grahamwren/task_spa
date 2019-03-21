import {connect} from 'react-redux';
import Header from './header';
import {getCurrentUserId} from '../../../api';
import {usersLoaded, getCurrentUser} from '../../../users';

const mapStateToProps = state => ({
  currentUserId: getCurrentUserId(state),
  currentUser: getCurrentUser(state)
});

export default connect(mapStateToProps, {usersLoaded})(Header);