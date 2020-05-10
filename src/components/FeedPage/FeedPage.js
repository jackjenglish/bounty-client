import React, { Component } from 'react';
import styled from 'styled-components';
import QuestionEntry from '../QuestionEntry';
import DiscoverSection from './DiscoverSection/DiscoverSection';
import Button from '../General/Button';
import H2 from '../General/H2';

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

const Bar = styled.div`
  max-width: 760px;
  margin-bottom: 0.5em;
  display: flex;
  align-items: center;
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
    this.selectTopic = this.selectTopic.bind(this);
    this.state = { filterTopic: null };
  }

  componentDidMount() {
    this.props.getPosts();
  }

  onClickPostQuestion() {
    this.props.history.push('post');
  }

  filterPosts(posts) {
    if (this.state.filterTopic) {
      return posts.filter(post => {
        const { topics } = post;
        if (!topics || topics.length < 1) return false;
        return (
          topics.filter(topic => topic.name === this.state.filterTopic).length >
          0
        );
      });
    }
    return posts;
  }

  selectTopic(topic) {
    this.setState({ filterTopic: topic });
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

    const filteredPosts = this.filterPosts(posts);
    const postItems = filteredPosts.map(post => {
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
              <Bar>
                <Button onClick={this.onClickPostQuestion}>New Post</Button>
                {this.state.filterTopic && (
                  <div className="d-flex align-items-center">
                    <H2 className="mb-0 ml-2 mr-2">{this.state.filterTopic}</H2>
                    <Button
                      size="small"
                      type="secondary"
                      onClick={() => this.setState({ filterTopic: null })}
                    >
                      Clear
                    </Button>
                  </div>
                )}
              </Bar>
            )}
            {postItems.length > 0 ? (
              postItems
            ) : (
              <H2 className="mb-0">No posts found</H2>
            )}
          </PostsContainer>
          <SideBar id="feed-sidebar" className="d-flex col-sm-0 col-md-4">
            <div>
              <DiscoverSection
                activeItem={this.state.filterTopic}
                items={itemsList}
                onItemClick={item => this.selectTopic(item)}
              />
            </div>
          </SideBar>
        </div>
      </FeedPageContainer>
    );
  }
}

export default FeedPage;
