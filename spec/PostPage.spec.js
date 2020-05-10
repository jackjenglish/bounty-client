import '../testSettings';
import React from 'react';
import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import PostPage from '../src/components/PostPage/PostPage';
import { PostTitle, BountyValue } from '../src/components/PostPage/PostPage';
import AnswerInput from '../src/components/PostPage/AnswerInput';
import CommentSection from '../src/components/PostPage/CommentSection';
import ActionButtons from '../src/components/PostPage/ActionButtons';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const emptyFn = () => {};
const DEFAULT_PROPS = {
  fetchPostData: emptyFn,
  submitComment: emptyFn,
  updateCommentText: emptyFn,
  clearAccepted: emptyFn,
  setAccepted: emptyFn,
  upvoteComment: emptyFn,
  clearUpvoteComment: emptyFn,
  upvotePost: emptyFn,
  clearUpvotePost: emptyFn,
  submitPostReport: emptyFn,
  submitCommentReport: emptyFn,
  history: {
    length: 6,
    action: 'POP',
    location: {
      pathname: '/post/1',
      search: '',
      hash: '',
      key: 'yjjnnn'
    }
  },
  location: {
    pathname: '/post/1',
    search: '',
    hash: '',
    key: 'yjjnnn'
  },
  match: {
    path: '/post/:id',
    url: '/post/1',
    isExact: true,
    params: {
      id: '1'
    }
  },
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
  },
  postData: {
    _id: '5e08a0706f35720f046b5d9b',
    title:
      'How are classes and bundles stored by the Symfony kernel, into the resulting container?',
    description:
      "I set up a small symfony project, built an authentication guard, and everything seems to work smooth, but i'm at a point where i setup 2 firewalls (one for the admin interface, and one for the website ...",
    topic: 'Computer Science',
    value: 0.7,
    currency: 'USD',
    slugId: '1',
    acceptedReply: null,
    commentCount: 1,
    score: 2,
    topics: [
      {
        _id: '5e6ceb736c95a12b68b788e7',
        name: 'Economics'
      }
    ],
    author: {
      _id: '5e0f515d2bb2fe4f383f910a',
      name: 'Joseph English',
      slugId: 'af3310',
      profileImgSrc: '\\static\\uploads\\eb435a810afb412fa09645932a0bb1c5.jpeg'
    },
    upvoted: {
      _id: '5e5d25eba2085713ed67100a',
      userId: '5e0f515d2bb2fe4f383f910a',
      postSlugId: '1'
    },
    comments: [
      {
        _id: '5e3c37beb0ccf81a58f4f902',
        text:
          '<h1>Header one</h1>\n<h2>Header two</h2>\n<blockquote>This is a block quote</blockquote>\n<ul>\n  <li>List Item</li>\n  <li>List item</li>\n</ul>\n<p>Standard text here, nothing special at all. But <strong>this is bold</strong>, <em>this is italic </em>and <u>this is underlined.</u></p>\n<ol>\n  <li>Ordered List here</li>\n  <li>another item</li>\n</ol>\n<pre><code>Code block</code></pre>\n<pre><code>right here</code></pre>\n<p>&lt;script&gt;alert("hello")&lt;/script&gt;</p>',
        score: 1,
        author: {
          _id: '5e0f515d2bb2fe4f383f910a',
          name: 'Joseph English',
          slugId: 'af3310',
          profileImgSrc:
            '\\static\\uploads\\eb435a810afb412fa09645932a0bb1c5.jpeg'
        },
        upvoted: {
          _id: '5e4540a8a2085713eda7e107',
          userId: '5e0f515d2bb2fe4f383f910a',
          commentId: '5e3c37beb0ccf81a58f4f902'
        }
      }
    ]
  },
  loading: false,
  commentText: ''
};

describe('PostPage', () => {
  beforeEach(() => {
    jasmineEnzyme();
  });
  let postPage;
  function renderComponent(props) {
    postPage = shallow(<PostPage {...{ ...DEFAULT_PROPS, ...props }} />);
  }

  beforeAll(() => {
    renderComponent();
  });

  describe('Content', () => {
    it('Contains the post title', function() {
      expect(postPage.find('div').text()).toContain(
        DEFAULT_PROPS.postData.title
      );
    });

    it('Contains the correct bounty amount', function() {
      expect(postPage.find('div').text()).toContain(
        `${DEFAULT_PROPS.postData.value.toFixed(2)}`
      );
    });

    it('Contains the post author name', function() {
      expect(postPage.find('div').text()).toContain(
        DEFAULT_PROPS.postData.author.name
      );
    });
  });

  describe('AnswerInput', () => {
    it('should not render  the answer input component if showAnswerState is false', () => {
      postPage.setState({
        showAnswerInput: false
      });
      expect(postPage.find(AnswerInput).length).toBe(0);
    });

    it('should render the answer input component if the showAnswerState is true', () => {
      postPage.setState({
        showAnswerInput: true
      });
      expect(postPage.find(AnswerInput).length).toBe(1);
    });
  });

  describe('CommentSection', () => {
    it('should render the comment section', () => {
      expect(postPage.find(CommentSection).length).toBe(1);
    });
  });

  describe('ActionButtons', () => {
    it('should render the action buttons bar', () => {
      expect(postPage.find(ActionButtons).length).toBe(1);
    });
  });
});
