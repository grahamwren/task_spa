import React from 'react';
import {connect} from 'react-redux';
import styled from '@emotion/styled/macro';
import Header from '../components/header';
import {getCurrentUserId} from "../../api";

const Wrapper = styled.div`
  height: 100%;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const allowedUnauthedPaths = ['/login', '/register'];

const Layout = ({children, history, currentUserId}) => {
  if (!(currentUserId || allowedUnauthedPaths.includes(window.location.pathname))) {
    history.push('/login');
    return null;
  }

  return (
    <Wrapper>
      <Header/>
      <Container>
        {children}
      </Container>
    </Wrapper>
  );
};

const mapStateToProps = state => ({
  currentUserId: getCurrentUserId(state)
});

export default connect(mapStateToProps)(Layout);
