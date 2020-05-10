import '../testSettings';
import React from 'react';
import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import ReportPage from '../src/components/ReportPage/ReportPage';
import { Tab } from '../src/components/ReportPage/ReportPage';
import ReportDetail from '../src/components/ReportPage/ReportDetail';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const emptyFn = () => {};
const DEFAULT_PROPS = {
  takeReportAction: emptyFn,
  getReports: emptyFn,
  removePost: emptyFn,
  history: {
    length: 9,
    action: 'POP',
    location: {
      pathname: '/reports',
      search: '',
      hash: '',
      key: '8ftf56'
    }
  },
  location: {
    pathname: '/reports',
    search: '',
    hash: '',
    key: '8ftf56'
  },
  match: {
    path: '/reports',
    url: '/reports',
    isExact: true,
    params: {}
  },
  commentReports: [
    {
      _id: '5e6c04e835447639581ca2b3',
      type: 'comment',
      reason: 'abuse',
      text: 'This is an abusive Comment',
      actionTaken: 'subject-removed',
      reportAuthor: {
        _id: '5e0f515d2bb2fe4f383f910a',
        name: 'Joseph English',
        slugId: 'af3310',
        profileImgSrc:
          '\\static\\uploads\\eb435a810afb412fa09645932a0bb1c5.jpeg'
      },
      subjectAuthor: {
        _id: '5e0f515d2bb2fe4f383f910a',
        name: 'Joseph English',
        slugId: 'af3310',
        profileImgSrc:
          '\\static\\uploads\\eb435a810afb412fa09645932a0bb1c5.jpeg'
      },
      subject: {
        _id: '5e5e443064d5fe5cacb00b37',
        authorId: '5e0f515d2bb2fe4f383f910a',
        postSlugId: '67b0813d91',
        text: '<p>go to this comment</p>',
        removed: true
      }
    }
  ],
  postReports: [
    {
      _id: '5e68fcf26c95a12b68b788dd',
      type: 'post',
      reason: 'remove-post',
      text: 'This post should be removed for reason x',
      actionTaken: 'award-bounty',
      reportAuthor: {
        _id: '5e0f515d2bb2fe4f383f910a',
        name: 'Joseph English',
        slugId: 'af3310',
        profileImgSrc:
          '\\static\\uploads\\eb435a810afb412fa09645932a0bb1c5.jpeg'
      },
      subjectAuthor: {
        _id: '5e0f515d2bb2fe4f383f910a',
        name: 'Joseph English',
        slugId: 'af3310',
        profileImgSrc:
          '\\static\\uploads\\eb435a810afb412fa09645932a0bb1c5.jpeg'
      },
      subject: {
        _id: '5e08a0706f35720f046b5d9b',
        title:
          'How are classes and bundles stored by the Symfony kernel, into the resulting container?',
        description:
          "I set up a small symfony project, built an authentication guard, and everything seems to work smooth, but i'm at a point where i setup 2 firewalls (one for the admin interface, and one for the website ...",
        topic: 'Computer Science',
        value: 0.7,
        currency: 'USD',
        slugId: '1',
        authorId: '5e0f515d2bb2fe4f383f910a',
        acceptedReply: null,
        commentCount: 1,
        score: 2,
        topics: ['5e6ceb736c95a12b68b788e7']
      }
    },
    {
      _id: '5e68fcf26c95a12b68b788de',
      type: 'post',
      reason: 'other',
      text: 'report',
      actionTaken: 'award-bounty',
      reportAuthor: {
        _id: '5e0f515d2bb2fe4f383f910a',
        name: 'Joseph English',
        slugId: 'af3310',
        profileImgSrc:
          '\\static\\uploads\\eb435a810afb412fa09645932a0bb1c5.jpeg'
      },
      subjectAuthor: {
        _id: '5e0f515d2bb2fe4f383f910a',
        name: 'Joseph English',
        slugId: 'af3310',
        profileImgSrc:
          '\\static\\uploads\\eb435a810afb412fa09645932a0bb1c5.jpeg'
      },
      subject: {
        _id: '5e08a0706f35720f046b5d9b',
        title:
          'How are classes and bundles stored by the Symfony kernel, into the resulting container?',
        description:
          "I set up a small symfony project, built an authentication guard, and everything seems to work smooth, but i'm at a point where i setup 2 firewalls (one for the admin interface, and one for the website ...",
        topic: 'Computer Science',
        value: 0.7,
        currency: 'USD',
        slugId: '1',
        authorId: '5e0f515d2bb2fe4f383f910a',
        acceptedReply: null,
        commentCount: 1,
        score: 2,
        topics: ['5e6ceb736c95a12b68b788e7']
      }
    }
  ],
  loading: false,
  loggedIn: true,
  user: {
    _id: '5e0f515d2bb2fe4f383f910a',
    name: 'Joseph English',
    email: 'jackjenglish3@gmail.com',
    slugId: 'af3310',
    bio: "I'm currently a compsci student",
    profileImgSrc: '\\static\\uploads\\eb435a810afb412fa09645932a0bb1c5.jpeg',
    education: 'Bsc. Computer Science, University College Cork',
    employment: 'Software Engineer, HubSpot',
    balance: 11.6
  }
};

describe('ReportPage', () => {
  beforeEach(() => {
    jasmineEnzyme();
  });
  let reportPage;
  function renderComponent(props) {
    reportPage = shallow(<ReportPage {...{ ...DEFAULT_PROPS, ...props }} />);
  }

  beforeAll(() => {
    renderComponent();
  });

  describe('Tabs', () => {
    it('Contains both tabs', function() {
      expect(reportPage.find(Tab).length).toBe(2);
    });
  });

  describe('Report Detail', () => {
    it('By default should not be rendered since no report is selected', function() {
      reportPage.setState({
        selectedReport: {
          _id: null,
          type: null
        }
      });
      expect(reportPage.find(ReportDetail).length).toBe(0);
    });

    it('should render ReportDetail once a report is selected', () => {
      reportPage.setState({
        selectedReport: {
          _id: DEFAULT_PROPS.commentReports[0]._id,
          type: 'comment'
        }
      });
      expect(reportPage.find(ReportDetail).length).toBe(1);
    });

    it('should pass correct props to ReportDetail once a report is selected', () => {
      reportPage.setState({
        selectedReport: {
          _id: DEFAULT_PROPS.commentReports[0]._id,
          type: 'comment'
        }
      });

      expect(reportPage.find(ReportDetail).prop('report')).toBe(
        DEFAULT_PROPS.commentReports[0]
      );
    });
  });
});
