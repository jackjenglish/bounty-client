import React, { Component } from 'react';
import styled from 'styled-components';
import Colors from '../styles/Colors';
import { Link, withRouter } from 'react-router-dom';
import StyledLink from '../General/StyledLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CheckIcon from '../General/CheckIcon';
import GreenLabel from '../General/GreenLabel';
import {
  POST_REPORT_REASONS,
  COMMENT_REPORT_REASONS
} from '../PostPage/PostReportModal';

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

const Label = styled.span`
  font-weight: 600;
`;

class ReportDetail extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    // this.props.onClickEntry();
  }

  renderSubject() {
    const { subject, subjectAuthor } = this.props.report;

    return (
      <SubjectWrapper>
        <StyledLink onClick={this.onClick} to={`/post/${subject.slugId}`}>
          <Title>{subject.title}</Title>
        </StyledLink>
        <div className="my-1">
          <StyledLink
            underline
            onClick={this.onClick}
            to={`/profile/${subjectAuthor.slugId}`}
            style={{ textDecorationColor: '#9d9d9d' }}
          >
            <Author>{subjectAuthor.name}</Author>
          </StyledLink>
        </div>
      </SubjectWrapper>
    );
  }

  getReason() {
    const { reason } = this.props.report;
    let reasonLabel = '';
    for (let i in POST_REPORT_REASONS) {
      if (POST_REPORT_REASONS[i].value === reason) {
        reasonLabel = POST_REPORT_REASONS[i].label;
      }
    }
    return (
      <div>
        <Label>Reason: </Label> {reasonLabel}
      </div>
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

    return (
      <div>
        {/* {resolved && <GreenLabel className="mb-1">Resolved</GreenLabel>} */}
        <div className="d-flex">
          <Content>
            <div>
              <ReportText>{this.getReason()}</ReportText>
              <ReportText>
                <Label>Text: </Label> {text}
              </ReportText>
              <ReportText>
                <Label>Submitted by: </Label>
                <StyledLink
                  underline
                  onClick={this.onClick}
                  to={`/profile/${subjectAuthor.slugId}`}
                  style={{ textDecorationColor: '#9d9d9d' }}
                >
                  <Author>{reportAuthor.name}</Author>
                </StyledLink>
              </ReportText>
            </div>
            <div className="my-2">{this.renderSubject()}</div>
          </Content>
        </div>
      </div>
    );
  }
}

export default withRouter(ReportDetail);
