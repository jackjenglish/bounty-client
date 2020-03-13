import React, { Component } from 'react';
import styled from 'styled-components';
import Colors from '../styles/Colors';
import { Link, withRouter } from 'react-router-dom';
import StyledLink from '../General/StyledLink';

const QuestionEntryContainer = styled.div`
  display: flex;
  border-top: 1px solid #ecf0f1;
  background: #fff;
  transition: all 0.18s ease-in-out;
  &:hover {
    box-shadow: 0 2px 5px 2px rgba(0, 0, 0, 0.06);
    transform: translateY(-2px);
  }
`;

const Content = styled.div`
  padding 12px;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${Colors.darkA};
  cursor: pointer;
  text-decoration: none;
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
`;

const BottomBarItem = styled.div`
  margin-right: 8px;
`;

const Value = styled(BottomBarItem)`
  color: ${Colors.red};
  font-size: 14px;
  font-weight: 600;
`;

const Topic = styled.div`
  color: ${Colors.grayQuora};
  font-size: 12px;
`;

class QuestionEntry extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.onClickEntry();
  }

  render() {
    const { title, topic, value, slugId } = this.props.data;

    return (
      <QuestionEntryContainer>
        <Content>
          <FlexContainer>
            <Value>${value.toFixed(2)}</Value>
            <Topic>{topic}</Topic>
          </FlexContainer>
          <div>
            <StyledLink onClick={this.onClick} to={`/post/${slugId}`}>
              <Title>{title}</Title>
            </StyledLink>
          </div>
        </Content>
      </QuestionEntryContainer>
    );
  }
}

export default withRouter(QuestionEntry);
