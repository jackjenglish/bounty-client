import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Colors from '../styles/Colors';

const WrappedLink = ({ underline, ...rest }) => <Link {...rest} />;

const StyledLink = styled(WrappedLink)`
  color: ${({ type }) => {
    if (type === 'light') {
      return '#9d9d9d';
    }
    return Colors.darkA;
  }}
  &:hover {
    color: ${({ type }) => {
      if (type === 'light') {
        return '#FFFFFF';
      }
      return Colors.darkA;
    }}
    text-decoration-color: ${Colors.darkA};
    text-decoration: ${({ underline }) => (underline ? 'underline' : 'none')}
  }
`;

export default StyledLink;
