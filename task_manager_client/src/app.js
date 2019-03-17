import React from 'react';
import styled from '@emotion/styled/macro';

const App = styled.div`
  text-align: center;
`;

const AppHeader = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const AppLink = styled.a`
  color: #61dafb;
`;

export default () => <App>
  <AppHeader>
    <p>
      Edit <code>src/App.js</code> and save to reload.
    </p>
    <AppLink
      href="https://reactjs.org"
      target="_blank"
      rel="noopener noreferrer"
    >
      Learn React
    </AppLink>
  </AppHeader>
</App>;
