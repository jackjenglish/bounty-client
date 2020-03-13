import React, { Component } from 'react';
import styled from 'styled-components';
import Colors from '../styles/Colors';
import Comment from './Comment';

const H3 = styled.div`
  color: #37352f;
  font-weight: 600;
  font-size: 16px;
`;

const Container = styled.div`
  border-radius: 4px;
  margin-bottom: 8px;
  background: #fff;
`;

class CommentSection extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.renderComment = this.renderComment.bind(this);
  }

  renderComment(comment) {
    const {
      acceptedReply,
      bountyValue,
      submitCommentReport,
      clearAccepted,
      setAccepted,
      upvoteComment,
      clearUpvoteComment,
      loggedInUser
    } = this.props;

    return (
      <Comment
        accepted={comment._id === acceptedReply}
        bountyValue={bountyValue}
        comment={comment}
        clearAccepted={() => clearAccepted(comment._id)}
        setAccepted={() => setAccepted(comment._id)}
        upvoteComment={() => upvoteComment(comment._id)}
        clearUpvoteComment={() => clearUpvoteComment(comment._id)}
        submitCommentReport={submitCommentReport}
        loggedInUser={loggedInUser}
        key={comment._id}
      />
    );
  }

  render() {
    const { comments } = this.props;
    if (!comments || comments.length < 1) {
      return <div />;
    }

    const commentItems = comments.map(this.renderComment);

    return (
      <Container id="">
        <div className="p-2">
          <H3>{comments.length} Comments </H3>
        </div>
        <div>{commentItems}</div>
      </Container>
    );
  }
}

export default CommentSection;
