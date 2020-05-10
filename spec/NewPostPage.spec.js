import '../testSettings';
import React from 'react';
import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import NewPostPage from '../src/components/NewPost/CreatePostPage';
import PostEditor from '../src/components/NewPost/PostEditor';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const emptyFn = () => {};
const DEFAULT_PROPS = {
  fetchTopics: emptyFn,
  fetchUserBalance: emptyFn,
  updateComposeField: emptyFn,
  submitPost: emptyFn,
  history: {
    length: 8,
    action: 'POP',
    location: {
      pathname: '/post',
      search: '',
      hash: '',
      key: 'sgpaud'
    }
  },
  location: {
    pathname: '/post',
    search: '',
    hash: '',
    key: 'sgpaud'
  },
  match: {
    path: '/post',
    url: '/post',
    isExact: true,
    params: {}
  },
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
  },
  title: 'example title',
  description: 'example description',
  value: 0,
  topics: [
    {
      _id: '5e6ceb736c95a12b68b788e6',
      name: 'Computer Science'
    },
    {
      _id: '5e6ceb736c95a12b68b788e7',
      name: 'Economics'
    },
    {
      _id: '5e6ceb736c95a12b68b788e8',
      name: 'Technology'
    },
    {
      _id: '5e6ceb736c95a12b68b788e9',
      name: 'Science'
    },
    {
      _id: '5e6ceb736c95a12b68b788ea',
      name: 'Health'
    },
    {
      _id: '5e6ceb736c95a12b68b788eb',
      name: 'Design'
    },
    {
      _id: '5e6ceb736c95a12b68b788ec',
      name: 'Pyschology'
    }
  ],
  selectedTopics: [],
  postCreated: false
};

describe('NewPostPage', () => {
  beforeEach(() => {
    jasmineEnzyme();
  });
  let newPostPage;
  function renderComponent(props) {
    newPostPage = shallow(<NewPostPage {...{ ...DEFAULT_PROPS, ...props }} />);
  }

  beforeAll(() => {
    renderComponent();
  });

  describe('PostEditor', () => {
    it('should render the PostEditor', () => {
      expect(newPostPage.find(PostEditor).length).toBe(1);
    });

    it('Should pass the post title to the editor', function() {
      expect(newPostPage.find(PostEditor).prop('title')).toBe(
        DEFAULT_PROPS.title
      );
    });

    it('Should pass the post description to the editor', function() {
      expect(newPostPage.find(PostEditor).prop('description')).toBe(
        DEFAULT_PROPS.description
      );
    });

    it('Should pass the post value to the editor', function() {
      expect(newPostPage.find(PostEditor).prop('value')).toBe(
        DEFAULT_PROPS.value
      );
    });
  });
});
