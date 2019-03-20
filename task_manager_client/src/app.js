import React from 'react';
import {Provider} from 'react-redux';
import styled from '@emotion/styled/macro';
import Login from "./login";
import createStore from './store';

const App = styled.div`
  height: 100%;
`;

export default () => (
  <Provider store={createStore()}>
    <App>
      <Login/>
    </App>
  </Provider>
);
