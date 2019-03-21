import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route as RawRoute} from 'react-router-dom';
import styled from '@emotion/styled/macro';
import createStore from './store';
import {Main} from './common/layouts'
import Home from './home';
import Login from './login';
import Logout from './common/components/logout';
import Register from './register';
import UserList from './users/user-list';
import User from './users/user';
import api from './api';

window.api = api;

function Route({component: Component, ...props}) {
  const component = cProps =>
    <Main {...cProps}>
      <Component {...cProps}/>
    </Main>;
  return <RawRoute component={component} {...props}/>;
}

const App = styled.div`
  height: 100%;
`;

export default () => (
  <Provider store={createStore()}>
    <Router>
      <App>
        <Route exact path="/" component={Home}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/logout" component={Logout}/>
        <Route exact path="/users" component={UserList}/>
        <Route path="/users/:userId" component={({match, ...p}) => <User userId={match.params.userId} {...p}/>}/>
      </App>
    </Router>
  </Provider>
);
