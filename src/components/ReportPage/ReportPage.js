import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { getReports } from '../../actions/reportActions';
import StyledLink from '../General/StyledLink';
import PostReport from './PostReport';
import ReportDetail from './ReportDetail';
const ReportPageContainer = styled.div``;

const ReportsContainer = styled.div`
  border-right: 1px solid #ecf0f1;
`;

const SideBar = styled.div``;

const Tab = styled(StyledLink)`
  color: #37352f;
  font-weight: 600;
  font-size: 1em;
  border-bottom: ${({ active }) =>
    active ? '2px solid rgba(34, 34, 34, 0.2)' : '0px'};
  cursor: pointer;
`;

class ReportPage extends Component {
  constructor(props) {
    super(props);
    this.state = { activeReportIndex: 0 };
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
    console.log('get reports');
    return postReports.map((report, index) => {
      return (
        <PostReport
          selected={index === this.state.activeReportIndex}
          key={report._id}
          report={report}
          onClick={() => {
            console.log('click', index);
            this.setState({
              activeReportIndex: index,
              reportType: 'post'
            });
          }}
        />
      );
    });
  }

  getCommentReports(commentReports) {
    return commentReports.map((report, index) => {
      return <div>Comment Report Number {index}</div>;
    });
  }

  getReportDetail() {
    const { activeReportIndex } = this.state;
    const { postReports } = this.props;
    return <ReportDetail report={postReports[activeReportIndex]} />;
  }

  render() {
    const { match, loading, postReports, commentReports } = this.props;

    if (loading) {
      return <ReportPageContainer>Loading...</ReportPageContainer>;
    }

    return (
      <ReportPageContainer className="container-fluid">
        <div className="row">
          <ReportsContainer className="col-sm-12 col-md-5">
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
            <div>
              <Route
                exact
                path={[match.url, `${match.url}/posts`]}
                render={() => {
                  return this.getPostReports(postReports);
                }}
              />
              <Route
                path={`${match.url}/comments`}
                render={() => {
                  return this.getCommentReports(commentReports);
                }}
              />
            </div>
          </ReportsContainer>
          <SideBar className="col-sm-0 col-md-7">
            {this.getReportDetail()}
          </SideBar>
        </div>
      </ReportPageContainer>
    );
  }
}

function mapStateToProps({ reports, auth }) {
  return {
    commentReports: reports.commentReports,
    postReports: reports.postReports,
    loading: reports.loading,
    loggedIn: auth.loggedIn,
    user: auth.user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getReports }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportPage);
