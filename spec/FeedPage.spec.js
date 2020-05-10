import '../testSettings';
import React from 'react';
import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import FeedPage from '../src/components/FeedPage/FeedPage';
import QuestionEntry from '../src/components/QuestionEntry';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const emptyFn = () => {};
const DEFAULT_PROPS = {
  getPosts: emptyFn,
  setPostDetail: emptyFn,
  upvotePost: emptyFn,
  clearUpvotePost: emptyFn,
  history: {
    length: 5,
    action: 'POP',
    location: {
      pathname: '/',
      search: '',
      hash: '',
      key: '0v1hb1'
    }
  },
  location: {
    pathname: '/',
    search: '',
    hash: '',
    key: '0v1hb1'
  },
  match: {
    path: '/',
    url: '/',
    isExact: true,
    params: {}
  },
  posts: [
    {
      _id: '5e08a0706f35720f046b5d9b',
      title:
        'How are classes and bundles stored by the Symfony kernel, into the resulting container?',
      description:
        "I set up a small symfony project, built an authentication guard, and everything seems to work smooth, but i'm at a point where i setup 2 firewalls (one for the admin interface, and one for the website ...",
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
        profileImgSrc:
          '\\static\\uploads\\eb435a810afb412fa09645932a0bb1c5.jpeg'
      },
      upvoted: {
        _id: '5e5d25eba2085713ed67100a',
        userId: '5e0f515d2bb2fe4f383f910a',
        postSlugId: '1'
      }
    },
    {
      _id: '5e09ee3f8aeda05160290ca7',
      title: 'What are your personal techniques for getting better sleep?',
      description: 'Any tips on this?',
      value: 2.25,
      currency: 'USD',
      slugId: '2',
      score: 0,
      author: {
        _id: '5e0f515d2bb2fe4f383f910a',
        name: 'Joseph English',
        slugId: 'af3310',
        profileImgSrc:
          '\\static\\uploads\\eb435a810afb412fa09645932a0bb1c5.jpeg'
      },
      topics: []
    },
    {
      _id: '5e09ee7b8aeda05160290ca8',
      title: 'Why is Bird worth $2.5 billion?',
      description:
        "I set up a small symfony project, built an authentication guard, and everything seems to work smooth, but i'm at a point where i setup 2 firewalls (one for the admin interface, and one for the website ...",
      value: 3.5,
      currency: 'USD',
      slugId: '3',
      score: 0,
      author: {
        _id: '5e0f515d2bb2fe4f383f910a',
        name: 'Joseph English',
        slugId: 'af3310',
        profileImgSrc:
          '\\static\\uploads\\eb435a810afb412fa09645932a0bb1c5.jpeg'
      },
      topics: []
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

describe('ProfilePage', () => {
  beforeEach(() => {
    jasmineEnzyme();
  });
  let feedPage;
  function renderComponent(props) {
    feedPage = shallow(
      <FeedPage {...{ ...DEFAULT_PROPS, ...props }} />
    ).shallow();
  }

  beforeAll(() => {
    renderComponent();
  });

  describe('Posts', () => {
    it('should render the correct number of posts in the feed', () => {
      expect(feedPage.find(QuestionEntry).length).toBe(
        DEFAULT_PROPS.posts.length
      );
    });
  });

  describe('Topics Sidebar', () => {
    it('should render the feed sidebar', () => {
      expect(feedPage.find('#feed-sidebar').length).toBe(1);
    });
  });
});
