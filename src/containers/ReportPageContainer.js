import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReportPage from '../components/ReportPage/ReportPage';
import {
  getReports,
  removePost,
  takeReportAction
} from '../actions/reportActions';

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
  return bindActionCreators(
    { takeReportAction, getReports, removePost },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportPage);
