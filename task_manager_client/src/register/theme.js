import styled from '@emotion/styled/macro';

export const RegisterContainer = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  & > * {
    width: 25%;
  }
`;

export const FormField = styled.div`
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
`;