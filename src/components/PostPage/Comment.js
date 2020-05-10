import React, { Component } from 'react';
import styled from 'styled-components';
import Colors from '../styles/Colors';
import DefaultProfileIcon from '@material-ui/icons/AccountCircle';
import PriorityHigh from '@material-ui/icons/PriorityHigh';
import CheckIcon from '../General/CheckIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import StyledLink from '../General/StyledLink';
import Interweave from 'interweave';
import markupStyles from './Markup.css';
import Modal from '../General/Modal';
import Button from '../General/Button';
import CheckItem from '../General/CheckItem/CheckItem';
import PostReportModal from './PostReportModal';

const CommentWrapper = styled.div`
  display: flex;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  padding: 12px 12px 8px 12px;
`;

const LeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 12px;
`;

const ScoreContainer = styled.div`
  margin-top: 0.25rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Score = styled.div`
  color: ${Colors.darkA};
  text-align: center;
  line-height: 1;
`;

const ProfileIcon = styled.div`
  width: 32px;
  height: 32px;
  background: rgba(28, 155, 95, 0.9);
  text-align: center;
  border-radius: 50%;
`;

const ProfileImg = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 50%;
  border: 1px solid #eee;
  object-fit: cover;
`;

const Exclamation = styled(PriorityHigh)`
  cursor: pointer;
  color: ${Colors.gray20};
  &:hover {
    color: ${Colors.headerDark};
  }
`;

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = { showAcceptAnswerModal: false, showReportModal: false };
    this.toggleActive = this.toggleActive.bind(this);
    this.toggleUpvote = this.toggleUpvote.bind(this);
  }

  toggleActive() {
    if (this.props.accepted) {
      this.props.clearAccepted();
    } else {
      this.props.setAccepted();
    }

    this.setState({ showAcceptAnswerModal: false });
  }

  toggleUpvote() {
    if (this.props.comment.upvoted) {
      this.props.clearUpvoteComment();
    } else {
      this.props.upvoteComment();
    }
  }

  renderCommentScoring(comment) {
    const voteIconStyle = {
      fontSize: '24px',
      color: Colors.gray20,
      cursor: 'pointer'
    };

    if (comment.upvoted) {
      voteIconStyle.color = Colors.darkGreen;
    }

    return (
      <ScoreContainer>
        <FontAwesomeIcon
          icon="angle-up"
          onClick={this.toggleUpvote}
          style={voteIconStyle}
        />
        <Score>{comment.score ? comment.score : 0}</Score>
      </ScoreContainer>
    );
  }

  renderAcceptAnswerModal() {
    if (this.state.showAcceptAnswerModal) {
      const commentAuthor = this.props.comment.author;
      const bounty = this.props.bountyValue.toFixed(2);

      return (
        <Modal show={this.state.showAcceptAnswerModal}>
          <div style={{ textAlign: 'center' }}>
            {this.props.accepted
              ? 'You have accepted this answer. Would you like to undo this?'
              : `Are you sure you would like to grant the bounty of $${bounty} to ${commentAuthor.name} for this answer?`}
          </div>
          <div className="d-flex justify-content-center mt-3">
            <Button className="mr-2" onClick={this.toggleActive}>
              Yes
            </Button>
            <Button
              type="secondary"
              onClick={() => this.setState({ showAcceptAnswerModal: false })}
            >
              Cancel
            </Button>
          </div>
        </Modal>
      );
    }
  }

  renderReportButton() {
    const { author, _id } = this.props.comment;

    return (
      <div>
        <Exclamation
          className="mt-2"
          onClick={() => this.setState({ showReportModal: true })}
        />
        <PostReportModal
          reportType="comment"
          author={author}
          show={this.state.showReportModal}
          cancel={() => this.setState({ showReportModal: false })}
          submitReport={(reason, text) =>
            this.props.submitCommentReport(_id, reason, text)
          }
        />
      </div>
    );
  }

  maybeRenderAcceptReply() {
    return (
      <CheckIcon
        active={this.props.accepted}
        toggleActive={() => this.setState({ showAcceptAnswerModal: true })}
      />
    );
  }
  render() {
    const { author, text, _id } = this.props.comment;

    return (
      <CommentWrapper key={_id}>
        <LeftWrapper>
          {this.maybeRenderAcceptReply()}
          {this.renderAcceptAnswerModal()}
          {this.renderCommentScoring(this.props.comment)}
          {this.renderReportButton()}
        </LeftWrapper>
        <div>
          <StyledLink className="d-flex mb-2" to={`/profile/${author.slugId}`}>
            <div className="mr-2">
              {author.profileImgSrc ? (
                <ProfileIcon>
                  <ProfileImg src={author.profileImgSrc} />
                </ProfileIcon>
              ) : (
                <DefaultProfileIcon
                  style={{
                    fontSize: '24px',
                    color: Colors.blueA
                  }}
                />
              )}
            </div>
            <span style={{ fontSize: '14px ' }}>{author.name}</span>
          </StyledLink>
          <div className="html-content">
            <Interweave content={text} />
          </div>
        </div>
      </CommentWrapper>
    );
  }
}

export default Comment;
