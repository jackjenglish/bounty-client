import React, { Component } from 'react';
import styled from 'styled-components';
import Colors from '../styles/Colors';
import ProfileIcon from '@material-ui/icons/AccountCircle';
import CheckIcon from '../General/CheckIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Interweave from 'interweave';
import markupStyles from '../PostPage/Markup.css';

const User = styled.div`
  display: inline-flex;
  align-items: center;
  color: ${Colors.darkA};
  font-size: 18px;
`;

const CommentWrapper = styled.div`
  border-top: 1px solid #ecf0f1;
  padding: 1rem;
  transition: all 0.18s ease-in-out;
  &:hover {
    box-shadow: 0 2px 5px 2px rgba(0, 0, 0, 0.06);
    transform: translateY(-2px);
  }
`;

const BottomWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
`;

const ScoreContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 1rem;
`;

const Score = styled.div`
  color: ${Colors.darkA};
  text-align: center;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #303030;
  cursor: pointer;
  text-decoration: none;
  margin-bottom: 0.25rem;
`;

class ProfileComment extends Component {
  constructor(props) {
    super(props);
    this.content = React.createRef();
  }

  componentDidMount() {
    if (this.content.current.offsetHeight >= 300) {
      this.content.current.style.boxShadow =
        'inset 0 -10px 10px -10px rgba(0,0,0,0.1)';
    }
  }

  renderCommentScoring(comment) {
    const voteIconStyle = {
      fontSize: '24px',
      color: Colors.gray20,
      // active state darkA,
      cursor: 'pointer',
      marginRight: '0.25rem'
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

  render() {
    const { text, _id, post } = this.props.comment;
    const { author } = this.props;

    return (
      <CommentWrapper>
        <Title>{post.title}</Title>
        <div style={{}} key={_id}>
          <div>
            <User>
              <ProfileIcon
                style={{
                  fontSize: '18px',
                  color: Colors.blueA,
                  marginRight: '0.25rem'
                }}
              />
              <span style={{ fontSize: '12px ' }}>{author.name}</span>
            </User>
            {/* <CommentText>{text}</CommentText> */}
            <div
              ref={this.content}
              style={{
                maxHeight: '300px',
                overflow: 'hidden'
              }}
              className="html-content"
            >
              <Interweave content={text} />
              <div id="gradient" />
            </div>
          </div>
          <BottomWrapper>
            <CheckIcon
              active={this.props.accepted}
              toggleActive={this.toggleActive}
            />
            {this.renderCommentScoring(this.props.comment)}
          </BottomWrapper>
        </div>
      </CommentWrapper>
    );
  }
}

export default ProfileComment;
