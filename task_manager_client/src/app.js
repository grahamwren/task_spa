import React from 'react';
import {Provider} from 'react-redux';
import styled from '@emotion/styled/macro';
import Login from "./login";
import createStore from './store';

import api from './api';

const App = styled.div`
  height: 100%;
`;

window.api = api;

export default () => (
  <Provider store={createStore()}>
    <App>
      <Login/>
    </App>
  </Provider>
);
