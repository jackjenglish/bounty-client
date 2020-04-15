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
import Button from '../General/Button';
import Interweave from 'interweave';
import markupStyles from '../PostPage/Markup.css';

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

const Description = styled.div`
  color: #131313;
  font-size: 12px;
`;

const REPORT_ACTION_LABELS = {
  'subject-removed': 'The subject of this report was removed',
  'report-disregard': 'No action was taken as a result of this report',
  'award-bounty': 'This posts bounty has been manually awarded by a moderator'
};

const REPORT_ACTIONS = {
  SUBJECT_REMOVED: 'subject-removed',
  REPORT_DISREGARD: 'report-disregard',
  AWARD_BOUNTY: 'award-bounty'
};

class ReportDetail extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    // this.props.onClickEntry();
  }

  renderSubject() {
    const { type, subject, subjectAuthor } = this.props.report;

    let subjectContent;
    if (type === 'post') {
      subjectContent = (
        <React.Fragment>
          <Title className="mb-1">{subject.title}</Title>
          <Description className="html-content">
            <Interweave content={subject.description} />
          </Description>
        </React.Fragment>
      );
    } else {
      subjectContent = (
        <Description className="html-content">
          <Interweave content={subject.text} />
        </Description>
      );
    }

    return (
      <SubjectWrapper>
        <StyledLink onClick={this.onClick} to={`/post/${subject.slugId}`}>
          {subjectContent}
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
    const { type, reason } = this.props.report;
    let reasons = POST_REPORT_REASONS;
    if (type === 'comment') reasons = COMMENT_REPORT_REASONS;

    let reasonLabel = '';
    for (let i in reasons) {
      if (reasons[i].value === reason) {
        reasonLabel = reasons[i].label;
      }
    }
    return (
      <div>
        <Label>Reason: </Label> {reasonLabel}
      </div>
    );
  }

  renderReportOutcome(actionTaken) {
    return (
      <div>
        <GreenLabel className="mb-1">Resolved</GreenLabel>
        <span style={{ fontWeight: 600, fontSize: '14px' }}>
          {' '}
          - {REPORT_ACTION_LABELS[actionTaken]}
        </span>
      </div>
    );
  }

  renderReportActions() {
    const { type } = this.props.report;
    return (
      <div>
        <Button
          onClick={() =>
            this.props.takeReportAction(REPORT_ACTIONS.SUBJECT_REMOVED)
          }
          size="small"
          type="delete"
          className="mr-2"
        >
          {type === 'post' ? 'Remove Post' : 'Remove Comment'}
        </Button>
        <Button
          className="mr-2"
          onClick={() =>
            this.props.takeReportAction(REPORT_ACTIONS.REPORT_DISREGARD)
          }
          size="small"
        >
          Disregard Report
        </Button>
        {type === 'post' && (
          <Button
            onClick={() =>
              this.props.takeReportAction(REPORT_ACTIONS.AWARD_BOUNTY)
            }
            size="small"
            type="yellow"
          >
            Bounty Awarded
          </Button>
        )}
      </div>
    );
  }

  render() {
    const {
      actionTaken,
      reason,
      text,
      reportAuthor,
      subjectAuthor,
      subject
    } = this.props.report;

    return (
      <div>
        {actionTaken && this.renderReportOutcome(actionTaken)}
        <div className="d-flex">
          <Content>
            <div className="mb-2">
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
            {!actionTaken && this.renderReportActions()}
            <div className="my-2">{this.renderSubject()}</div>
          </Content>
        </div>
      </div>
    );
  }
}

export default withRouter(ReportDetail);
