import React, { Component } from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';
import StyledLink from '../General/StyledLink';
import ReportEntry from './ReportEntry';
import ReportDetail from './ReportDetail';
import Select from 'react-select';
import getObjectIndexByValue from '../../utils/getObjectIndexByValue';

const ReportPageContainer = styled.div`
  height: calc(100vh - 48px - 1.5rem);
`;
const ReportsContainer = styled.div`
  border-right: 1px solid #ecf0f1;
`;

const DetailContainer = styled.div`
  overflow-y: scroll;
`;

export const Tab = styled(StyledLink)`
  color: #37352f;
  font-weight: 600;
  font-size: 1em;
  border-bottom: ${({ active }) =>
    active ? '2px solid rgba(34, 34, 34, 0.2)' : '0px'};
  cursor: pointer;
`;

const FILTER_OPTIONS = [
  { label: 'Unresolved', value: 'unresolved' },
  { label: 'Resolved', value: 'resolved' }
];

class ReportPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postReportSelectedIndex: -1,
      commentReportSelectedIndex: -1,
      selectedReport: {
        type: null,
        _id: null
      },
      filterType: FILTER_OPTIONS[0]
    };
    this.onClickPostQuestion = this.onClickPostQuestion.bind(this);
    this.isActive = this.isActive.bind(this);
    this.getPostReports = this.getPostReports.bind(this);
  }

  componentDidMount() {
    this.props.getReports();
  }

  onClickPostQuestion() {}

  isActive(slug) {
    const { match, location } = this.props;
    if (slug === 'posts') {
      return (
        match.url === location.pathname ||
        location.pathname === `${match.url}/posts`
      );
    }
    if (slug === 'comments') {
      return location.pathname === `${match.url}/comments`;
    }
    return false;
  }

  getPostReports(postReports) {
    return postReports.map((report, index) => {
      return (
        <ReportEntry
          selected={index === this.state.postReportSelectedIndex}
          key={report._id}
          report={report}
          onClick={() => {
            this.setState({
              selectedReport: {
                _id: report._id,
                type: 'post'
              }
            });
          }}
        />
      );
    });
  }

  getCommentReports(commentReports) {
    return commentReports.map((report, index) => {
      return (
        <ReportEntry
          selected={index === this.state.commentReportSelectedIndex}
          key={report._id}
          report={report}
          onClick={() => {
            this.setState({
              selectedReport: {
                _id: report._id,
                type: 'comment'
              }
            });
          }}
        />
      );
    });
  }

  getSelectedReport() {
    const { commentReports, postReports } = this.props;
    const {
      selectedReport: { type, _id }
    } = this.state;

    if (!type || !_id) return;

    let reports = postReports;
    if (type === 'comment') {
      reports = commentReports;
    }

    const index = getObjectIndexByValue(reports, '_id', _id);
    if (index < 0) return;
    return reports[index];
  }

  getReportDetail() {
    const { takeReportAction } = this.props;
    const report = this.getSelectedReport();
    if (!report) return <div>No Report Selected.</div>;
    return (
      <ReportDetail
        takeReportAction={reportAction =>
          takeReportAction(report, reportAction)
        }
        report={report}
      />
    );
  }

  applyFilters(reports) {
    return reports.filter(report => {
      if (this.state.filterType.value === 'unresolved') {
        return !report.actionTaken;
      }
      return report.actionTaken;
    });
  }

  render() {
    const { match, loading, postReports, commentReports } = this.props;

    if (loading) {
      return <ReportPageContainer>Loading...</ReportPageContainer>;
    }

    const filteredPostReports = this.applyFilters(postReports);
    const filteredCommentReports = this.applyFilters(commentReports);

    return (
      <ReportPageContainer className="container-fluid">
        <div className="h-100 row">
          <ReportsContainer className="d-flex flex-column h-100 col-sm-12 col-md-5">
            <div className="d-flex justify-content-center mb-3">
              <div className="px-2">
                <Tab active={this.isActive('posts')} to={`${match.url}/posts`}>
                  Posts
                </Tab>
              </div>
              <div className="px-2">
                <Tab
                  active={this.isActive('comments')}
                  to={`${match.url}/comments`}
                >
                  Comments
                </Tab>
              </div>
            </div>
            <Select
              className="mb-2"
              value={this.state.filterType}
              onChange={option => this.setState({ filterType: option })}
              options={FILTER_OPTIONS}
            />
            <div style={{ overflowY: 'scroll' }}>
              <Route
                exact
                path={[match.url, `${match.url}/posts`]}
                render={() => {
                  if (filteredPostReports.length < 1) {
                    return <div>No Reports found</div>;
                  }
                  return this.getPostReports(filteredPostReports);
                }}
              />
              <Route
                path={`${match.url}/comments`}
                render={() => {
                  if (filteredCommentReports.length < 1) {
                    return <div>No Reports found</div>;
                  }
                  return this.getCommentReports(filteredCommentReports);
                }}
              />
            </div>
          </ReportsContainer>
          <DetailContainer className="h-100 col-sm-0 col-md-7">
            {this.getReportDetail()}
          </DetailContainer>
        </div>
      </ReportPageContainer>
    );
  }
}

export default ReportPage;
