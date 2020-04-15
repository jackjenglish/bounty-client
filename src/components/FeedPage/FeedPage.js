import React, { Component } from 'react';
import styled from 'styled-components';
import QuestionEntry from '../QuestionEntry';
import styles from './FeedPage.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setPostDetail } from '../../actions/feedActions';
import { getPosts } from '../../actions/feedActions';
import { upvotePost, clearUpvotePost } from '../../actions/postActions';
import ActionBar from './ActionBar';
import DiscoverSection from './DiscoverSection/DiscoverSection';

const FeedPageContainer = styled.div`
  max-width: 960px;
  margin: 0 auto;
`;

const PostsContainer = styled.div`
  border-right: 1px solid #ecf0f1;
`;

const SideBar = styled.div``;

const Tile = styled.div`
  cursor: pointer;
  width: 140px;
  height: 100px;
  background: #160722;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  /*color: #a756ef;*/
  color: #fff;
  text-align: center;
  padding: 12px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.18s ease-in-out;
  &:hover {
    box-shadow: 0px 15px 30px 0 rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
  background: linear-gradient(rgb(247, 220, 88), rgb(254, 161, 22));
`;

const TileB = styled(Tile)`
  background: linear-gradient(#a756ef, #160722);
`;
const TileC = styled(Tile)`
  background: linear-gradient(#2193b0, #6dd5ed);
`;

const TileD = styled(Tile)`
  background: linear-gradient(#ff0099, #493240);
`;

const itemsList = [
  'Computer Science',
  'Economics',
  'Technology',
  'Music',
  'Books',
  'Architecture',
  'Physics',
  'General',
  'Personal',
  'Random',
  'Astronomy',
  'JavaScript',
  'Android',
  'Java',
  'Python',
  'Databases',
  'Algorithms',
  'Logic',
  'Electrical Engineering'
];

class FeedPage extends Component {
  constructor(props) {
    super(props);
    this.onClickPostQuestion = this.onClickPostQuestion.bind(this);
  }

  componentDidMount() {
    this.props.getPosts();
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    var scrollValue = document.documentElement.scrollTop;
    var documentHeight = document.body.scrollHeight;
    var windowHeight = window.innerHeight;
    if (scrollValue >= documentHeight - windowHeight - 250) {
      // console.log('LOAD MORE');
      // if (!this.state.loading) {
      //   this.loadItems(this.props.category);
      // }
    }
  }

  onClickPostQuestion() {
    this.props.history.push('post');
  }

  render() {
    const {
      clearUpvotePost,
      loading,
      posts,
      setPostDetail,
      loggedIn,
      user,
      upvotePost
    } = this.props;

    if (loading) {
      return <FeedPageContainer>Loading...</FeedPageContainer>;
    }

    const postItems = posts.map(post => {
      return (
        <QuestionEntry
          data={post}
          onClickEntry={() => setPostDetail(post)}
          key={post.title}
          upvotePost={upvotePost}
          clearUpvotePost={clearUpvotePost}
        />
      );
    });
    return (
      <FeedPageContainer className="container">
        <div className="row">
          <PostsContainer className="col-sm-12 col-md-8">
            {loggedIn && (
              <ActionBar
                user={user}
                onClickPostQuestion={this.onClickPostQuestion}
              />
            )}
            {postItems}
          </PostsContainer>
          <SideBar className="d-flex col-sm-0 col-md-4">
            <div style={{}}>
              <DiscoverSection
                items={itemsList}
                // onItemClick={item => this.itemClick(item, 'popular')}
              />
            </div>
            {/* <Tile className="mb-2">Computer Science</Tile>
            <TileB className="mb-2">Computer Science</TileB>
            <TileC className="mb-2">Computer Science</TileC>
            <TileD className="mb-2">Computer Science</TileD> */}
          </SideBar>
        </div>
      </FeedPageContainer>
    );
  }
}

function mapStateToProps({ feed, auth }) {
  return {
    posts: feed.posts,
    loading: feed.loading,
    loggedIn: auth.loggedIn,
    user: auth.user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setPostDetail,
      getPosts,
      upvotePost,
      clearUpvotePost
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedPage);
