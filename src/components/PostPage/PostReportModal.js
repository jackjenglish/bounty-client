import cx from 'classnames';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Colors from '../styles/Colors';
import StyledLink from '../General/StyledLink';
import CheckItem from '../General/CheckItem/CheckItem';
import Modal from '../General/Modal';
import TextArea from '../General/TextArea';
import Button from '../General/Button';

const BottomBarItem = styled.div`
  margin-right: 8px;
`;

export const POST_REPORT_REASONS = [
  { value: 'unawarded-bounty', label: 'Failing to award the bounty' },
  { value: 'remove-post', label: 'This post should be removed' },
  { value: 'other', label: 'Other' }
];

export const COMMENT_REPORT_REASONS = [
  { value: 'abuse', label: 'Abuse' },
  { value: 'inappropriate', label: 'Inappropriate' },
  { value: 'spam', label: 'Spam' },
  { value: 'off-topic', label: 'Off Topic' },
  { value: 'other', label: 'Other' }
];

class PostReportModal extends Component {
  constructor(props) {
    super(props);
    const reportReasons =
      props.reportReason === 'post'
        ? POST_REPORT_REASONS
        : COMMENT_REPORT_REASONS;
    this.state = {
      reportReason: reportReasons[0].value,
      reportText: ''
    };

    this.onClickReport = this.onClickReport.bind(this);
    this.submitReport = this.submitReport.bind(this);
    this.setReportReason = this.setReportReason.bind(this);
  }

  setReportReason(reportReason) {
    return () => {
      this.setState({ reportReason });
    };
  }

  onClickReport() {
    this.setState({ showReportModal: true });
  }

  submitReport() {
    this.props.submitReport(this.state.reportReason, this.state.reportText);
    this.props.cancel();
  }

  render() {
    const { author, show, reportType } = this.props;

    const reportReasons =
      reportType === 'post' ? POST_REPORT_REASONS : COMMENT_REPORT_REASONS;

    return (
      <Modal show={show}>
        <div className="text-center" style={{ fontWeight: '600' }}>
          Why would you like to report
          <StyledLink to={`/profile/${author.slugId}`}>
            {` ${author.name} `}
          </StyledLink>
          for this {this.props.reportType}?
        </div>
        <div>
          {reportReasons.map(reportReason => (
            <CheckItem
              key={reportReason.value}
              value={reportReason.label}
              checked={this.state.reportReason === reportReason.value}
              toggle={this.setReportReason(reportReason.value)}
              layout="check-first"
            />
          ))}
          <TextArea
            className="mt-2"
            name="reportText"
            type="text"
            placeholder="Add details"
            value={this.state.reportText}
            onChange={evt => this.setState({ reportText: evt.target.value })}
            rows="2"
          />
        </div>
        <div className="d-flex justify-content-center mt-3">
          <Button className="mr-2" onClick={this.submitReport}>
            Submit
          </Button>
          <Button type="secondary" onClick={this.props.cancel}>
            Cancel
          </Button>
        </div>
      </Modal>
    );
  }
}

export default PostReportModal;
