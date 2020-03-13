import React, { Component } from 'react';
import styled from 'styled-components';
import Colors from '../styles/Colors';
import CommentSection from './CommentSection';
import ActionButtons from './ActionButtons';
import AnswerInput from './AnswerInput';
import StyledLink from '../General/StyledLink';
import Interweave from 'interweave';
import PostReportModal from './PostReportModal';
import markUpStyles from './Markup.css';

const PostPageContainer = styled.div`
  max-width: 760px;
  margin: 0 auto 0 auto;
  padding: 0 0 1rem 0;
`;

const PostContainer = styled.div`
  background: #ffffff;
  padding: 12px 12px 8px 12px;
  border-radius: 4px;
  /* box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); */
  border-bottom: 1px solid #ecf0f1;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #303030;
  cursor: pointer;
  text-decoration: none;
  line-height: 1.4;
`;

const Topic = styled.div`
  color: ${Colors.grayQuora};
  font-size: 16px;
  margin-bottom: 4px;
`;

const BottomBar = styled.div`
  display: flex;
  font-size: 16px;
`;

const BottomBarItem = styled.div`
  margin-right: 8px;
`;

const Value = styled(BottomBarItem)`
  color: ${Colors.red};
  font-weight: 600;
`;

const Author = styled(BottomBarItem)`
  color: ${Colors.gray222};
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const Divider = styled.div`
  height: 2px;
  width: 100%;
  background: #efefef;
  margin-top: 8px;
  margin-bottom: 8px;
`;

const Description = styled.div`
  color: #131313;
  margin-bottom: 8px;
  font-size: 14px;
`;

const CommentsWrapper = styled.div``;

class PostPage extends Component {
  constructor(props) {
    super(props);
    this.state = { showAnswerInput: false };
    this.commentSection = React.createRef();
    this.onClickAnswer = this.onClickAnswer.bind(this);
    this.onClickReport = this.onClickReport.bind(this);
    this.submitReport = this.submitReport.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchPostData(id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.goToComment !== this.props.goToComment) {
      this.setState({ showAnswerInput: false }, () =>
        window.scrollTo(0, this.commentSection.current.offsetTop)
      );
    }
  }
  onClickAnswer() {
    this.setState(prevState => ({
      showAnswerInput: !prevState.showAnswerInput
    }));
  }

  onClickReport() {
    this.setState({ showReportModal: true });
  }

  submitReport() {}

  renderReportModal() {
    const { author } = this.props.postData;

    return (
      <PostReportModal
        author={author}
        show={this.state.showReportModal}
        cancel={() => this.setState({ showReportModal: false })}
        reportType="post"
        submitReport={(type, text) => this.props.submitPostReport(type, text)}
      />
    );
  }

  render() {
    const {
      postData,
      loading,
      commentText,
      updateCommentText,
      submitComment,
      clearAccepted,
      setAccepted,
      upvoteComment,
      clearUpvoteComment,
      upvotePost,
      clearUpvotePost,
      submitCommentReport,
      user
    } = this.props;
    const { topic, title, value, author, comments, acceptedReply } = postData;

    return (
      <PostPageContainer>
        {!loading && (
          <PostContainer>
            <div>
              <Topic>{topic}</Topic>
              <Title>{title}</Title>
              <BottomBar className="my-1">
                <Value>${value.toFixed(2)}</Value>
                <StyledLink to={`/profile/${postData.author.slugId}`}>
                  <Author>{author.name}</Author>
                </StyledLink>
              </BottomBar>
            </div>
            <Description className="html-content">
              <Interweave content={postData.description} />
            </Description>
            <ActionButtons
              postData={postData}
              upvotePost={upvotePost}
              clearUpvotePost={clearUpvotePost}
              onClickAnswer={this.onClickAnswer}
              onClickReport={this.onClickReport}
            />
          </PostContainer>
        )}
        {this.renderReportModal()}
        {this.state.showAnswerInput && (
          <AnswerInput
            author={postData.author}
            commentText={commentText}
            onChange={htmlState => updateCommentText(htmlState)}
            submit={submitComment}
          />
        )}
        <CommentsWrapper ref={this.commentSection}>
          <CommentSection
            bountyValue={postData.value}
            loggedInUser={user}
            acceptedReply={acceptedReply}
            comments={comments}
            clearAccepted={clearAccepted}
            setAccepted={setAccepted}
            upvoteComment={upvoteComment}
            clearUpvoteComment={clearUpvoteComment}
            submitCommentReport={submitCommentReport}
          />
        </CommentsWrapper>
      </PostPageContainer>
    );
  }
}

export default PostPage;
