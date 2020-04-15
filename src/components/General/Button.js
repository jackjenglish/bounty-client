import styled from 'styled-components';
import React from 'react';
import Colors from '../styles/Colors';

const BaseButton = styled.div`
  &:hover {
    box-shadow: ${({ hoverShadow }) =>
      hoverShadow ? '0px 4px 8px rgba(0, 0, 0, 0.1)' : 'none'};
  }
`;

const baseButtonStyle = {
  cursor: 'pointer',
  background: 'hsl(200, 96%, 90%)',
  display: 'inline-block',
  padding: '8px 14px',
  borderRadius: '4px',
  color: 'hsl(205, 100%, 21%)',
  fontWeight: 500
};

function applySizing(style, size) {
  style = Object.assign({}, style);
  switch (size) {
    case 'small': {
      style.padding = '4px 7px';
      style.fontSize = '14px';
      break;
    }
    case 'large': {
      //style.padding = '';
      //style.fontSize = '';
      break;
    }
  }
  return style;
}

function applyTypeStyling(style, type) {
  style = Object.assign({}, style);
  switch (type) {
    case 'delete': {
      style.background = Colors.lightRed;
      style.color = Colors.darkRed;
      break;
    }
    case 'yellow': {
      style.background = '#DE911D';
      style.color = '#780A0A';
      break;
    }
    case 'secondary': {
      style.background = Colors.darkUnderline;
      style.color = Colors.darkA;
      break;
    }
    case 'outline': {
      style.background = 'none';
      style.border = '1px solid #eee';
      style.color = '#444';
      break;
    }
  }
  return style;
}

const Button = props => {
  let style = baseButtonStyle;
  const { size, type, ...rest } = props;
  style = applySizing(style, size);
  style = applyTypeStyling(style, type);

  return <BaseButton style={style} {...rest} />;
};

export default Button;
