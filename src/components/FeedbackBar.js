import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { css, keyframes } from 'styled-components';
import { bindActionCreators } from 'redux';
import { logout } from '../actions/authActions';
import { withRouter } from 'react-router-dom';
import Colors from './styles/Colors';

const modalShow = keyframes`
  from {
    height: 0px;
  }
  to {
    height: 48px;
  }
`;

const animation = css`
  animation: ${modalShow} 0.35s forwards;
`;

const Bar = styled.div`
  position: fixed;
  top: 0;
  height: 0px;
  background: ${Colors.lightGreen};
  background: ${({ type }) => {
    switch (type) {
      case 'success': {
        return Colors.lightGreen;
      }
      default: {
        return '#FFF';
      }
    }
  }}
  border-bottom: 1px solid #efefef;
  width: 100%;
  overflow: hidden;
  ${animation}
`;
//   ${({ show }) => (show ? animation : 'animation: none;')};
const Content = styled.div`
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FeedbackText = styled.div`
  font-weight: 600;
`;

class FeedbackBar extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setTimeout(this.props.clearFeedbackBar, 2000);
  }

  render() {
    const {
      feedback: { feedbackText, feedbackType }
    } = this.props;

    return (
      <Bar type={feedbackType}>
        <Content>
          <FeedbackText>{feedbackText}</FeedbackText>
        </Content>
      </Bar>
    );
  }
}
export default FeedbackBar;
