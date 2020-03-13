import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Colors from '../styles/Colors';

const CheckCircle = styled.div`
  height: 24px;
  width: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${({ active }) => (active ? Colors.lightGreen : '#EFEFEF')};
  cursor: pointer;
`;

const CheckIcon = ({ active, toggleActive }) => {
  const iconStyle = {
    color: Colors.gray20,
    fontSize: '12px'
  };

  if (active) {
    iconStyle.color = Colors.darkGreen;
  }

  return (
    <CheckCircle active={active} onClick={toggleActive}>
      <FontAwesomeIcon icon="check" style={iconStyle} />
    </CheckCircle>
  );
};

export default CheckIcon;
