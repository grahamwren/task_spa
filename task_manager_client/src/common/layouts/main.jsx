import React from 'react';
import {connect} from 'react-redux';
import styled from '@emotion/styled/macro';
import Header from '../components/header';
import {getCurrentUserId} from "../../api";

const Wrapper = styled.div`
  height: 100%;
`;

const Layout = ({children, history, currentUserId}) => {
  if (!currentUserId && window.location.pathname !== '/login') {
    history.push('/login');
    return null;
  }

  return (
    <Wrapper>
      <Header/>
      {children}
    </Wrapper>
  );
};

const mapStateToProps = state => ({
  currentUserId: getCurrentUserId(state)
});

export default connect(mapStateToProps)(Layout);
