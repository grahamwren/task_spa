import React, {PureComponent} from 'react';
import styled from '@emotion/styled/macro';

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default class Home extends PureComponent {
  render() {
    return (
      <Container>
        <span>Hello World!</span>
        <span>Hello World!</span>
        <span>Hello World!</span>
      </Container>
    );
  }
}