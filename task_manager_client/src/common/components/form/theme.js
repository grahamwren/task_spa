import styled from '@emotion/styled/macro';

export const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem 1rem;

  & > * {
    width: calc(100% - 2rem);
  }
`;

export const Field = styled.div`
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
`;