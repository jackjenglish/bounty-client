import styled from 'styled-components';

const H2 = styled.div`
  color: #37352f;
  font-weight: 600;
  font-size: 24px;
  border-bottom: ${({ underline }) =>
    underline ? '2px solid rgba(34, 34, 34, 0.2)' : 'none'};
  margin-bottom: 0.5em;
`;

export default H2;
