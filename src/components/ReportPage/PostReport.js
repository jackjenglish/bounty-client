import React, { Component } from 'react';
import styled from 'styled-components';
import Colors from '../styles/Colors';
import { Link, withRouter } from 'react-router-dom';
import StyledLink from '../General/StyledLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CheckIcon from '../General/CheckIcon';
import GreenLabel from '../General/GreenLabel';
import PostReportModal from '../PostPage/PostReportModal';

const Container = styled.div`
  background: #fff;
  cursor: pointer;
  padding 12px;
  border-top: 1px solid #ecf0f1;
  border-left: ${({ selected }) => (selected ? '4px solid #444' : 'none')}
  transition: all 0.18s ease-in-out;
  &:hover {
    box-shadow: 0 2px 5px 2px rgba(0, 0, 0, 0.06);
    transform: translateY(-2px);
  }
`;

const Content = styled.div``;

const ReportText = styled.div`
  font-size: 14px;
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
`;

const BottomBar = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
`;

const Author = styled.div`
  display: inline;
  color: #9d9d9d;
  font-size: 14px;
`;

const SubjectWrapper = styled.div`
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 8px;
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: 600;
  line-height: normal;
  color: ${Colors.darkA};
  cursor: pointer;
  text-decoration: none;
`;

class PostReport extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    // this.props.onClickEntry();
    console.log('clack');
    this.props.onClick();
  }

  renderSubject() {
    const { subject, subjectAuthor } = this.props.report;

    return (
      <SubjectWrapper>
        {/* <StyledLink to={`/post/${subject.slugId}`}> */}
        <Title>{subject.title}</Title>
        {/* </StyledLink> */}
        <div className="my-1">
          {/* <StyledLink
            underline
            onClick={this.onClick}
            to={`/profile/${subjectAuthor.slugId}`}
            style={{ textDecorationColor: '#9d9d9d' }}
          > */}
          <Author>{subjectAuthor.name}</Author>
          {/* </StyledLink> */}
        </div>
      </SubjectWrapper>
    );
  }

  render() {
    const {
      reason,
      text,
      reportAuthor,
      subjectAuthor,
      subject
    } = this.props.report;
    console.log('active', this.props.active);
    return (
      <Container onClick={this.onClick} selected={this.props.selected}>
        {/* {resolved && <GreenLabel className="mb-1">Resolved</GreenLabel>} */}
        <div className="d-flex">
          <Content>
            <FlexContainer>
              <div>
                <ReportText>{text}</ReportText>
                <div className="p-2">{this.renderSubject()}</div>
              </div>
            </FlexContainer>
            <BottomBar>
              <Author>{reportAuthor.name}</Author>
            </BottomBar>
          </Content>
        </div>
      </Container>
    );
  }
}

export default withRouter(PostReport);
