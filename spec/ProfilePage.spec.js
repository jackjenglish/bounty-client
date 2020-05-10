import '../testSettings';
import React from 'react';
import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import ProfilePage from '../src/components/ProfilePage/ProfilePage';
import { Tab } from '../src/components/ProfilePage/ProfilePage';
import ProfileInfo from '../src/components/ProfilePage/ProfileInfo';
Enzyme.configure({ adapter: new EnzymeAdapter() });

const App = () => {
  return <h1 className="App-title">Welcome to React</h1>;
};

describe('App component testing', function() {
  beforeEach(() => {
    jasmineEnzyme();
  });

  it('renders welcome message', function() {
    const wrapper = shallow(<App />);
    const welcome = <h1 className="App-title">Welcome to React</h1>;

    expect(wrapper.contains(welcome)).toEqual(true);
  });
});

const emptyFn = () => {};
const DEFAULT_PROPS = {
  fetchProfile: emptyFn,
  editProfile: emptyFn,
  uploadProfileImage: emptyFn,
  history: {
    length: 4,
    action: 'POP',
    location: {
      pathname: '/profile/af3310',
      search: '',
      hash: '',
      key: 'ltt0uh'
    }
  },
  location: {
    pathname: '/profile/af3310',
    search: '',
    hash: '',
    key: 'ltt0uh'
  },
  match: {
    path: '/profile/:id',
    url: '/profile/af3310',
    isExact: true,
    params: {
      id: 'af3310'
    }
  },
  profile: {
    _id: '5e0f515d2bb2fe4f383f910a',
    name: 'Joseph English',
    email: 'jackjenglish3@gmail.com',
    slugId: 'af3310',
    bio:
      "I'm currently a 4th year Computer Science student at UCC. My primary focus is in front-end development.",
    profileImgSrc: '\\static\\uploads\\eb435a810afb412fa09645932a0bb1c5.jpeg',
    education: 'Bsc. Computer Science, University College Cork',
    employment: 'Software Engineer, HubSpot',
    balance: 11.6,
    posts: [
      {
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
    ],
    comments: [
      {
        _id: '5e3c37beb0ccf81a58f4f902',
        authorId: '5e0f515d2bb2fe4f383f910a',
        postSlugId: '1',
        text:
          '<h1>Header one</h1>\n<h2>Header two</h2>\n<blockquote>This is a block quote</blockquote>\n<ul>\n  <li>List Item</li>\n  <li>List item</li>\n</ul>\n<p>Standard text here, nothing special at all. But <strong>this is bold</strong>, <em>this is italic </em>and <u>this is underlined.</u></p>\n<ol>\n  <li>Ordered List here</li>\n  <li>another item</li>\n</ol>\n<pre><code>Code block</code></pre>\n<pre><code>right here</code></pre>\n<p>&lt;script&gt;alert("hello")&lt;/script&gt;</p>',
        score: 1,
        post: {
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
    ]
  },
  fieldsUpdating: {},
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
  let profilePage;
  function renderComponent(props) {
    profilePage = shallow(
      <ProfilePage {...{ ...DEFAULT_PROPS, ...props }} />
    ).shallow();
  }

  beforeAll(() => {
    renderComponent();
  });

  describe('ProfileInfo', () => {
    it('should render profile information component', () => {
      expect(profilePage.find(ProfileInfo).length).toBe(1);
    });

    it('should pass the profile prop down to ProfileInfo', () => {
      expect(profilePage.find(ProfileInfo).prop('profile')).toBe(
        DEFAULT_PROPS.profile
      );
    });
  });

  describe('Tabs', () => {
    it('Contains both tabs', function() {
      expect(profilePage.find(Tab).length).toBe(2);
    });
  });
});
