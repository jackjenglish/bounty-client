import React, { Component } from 'react';
import styled from 'styled-components';
import Colors from './styles/Colors';
import { Link, withRouter } from 'react-router-dom';
import StyledLink from './General/StyledLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CheckIcon from './General/CheckIcon';
import GreenLabel from './General/GreenLabel';

const QuestionEntryContainer = styled.div`
  background: #fff;
  padding 12px;
  border-top: 1px solid #ecf0f1;
  transition: all 0.18s ease-in-out;
  &:hover {
    box-shadow: 0 2px 5px 2px rgba(0, 0, 0, 0.06);
    transform: translateY(-2px);
  }
`;

const Content = styled.div``;

const Title = styled.div`
  font-size: 18px;
  font-weight: 600;
  line-height: normal;
  color: ${Colors.darkA};
  cursor: pointer;
  text-decoration: none;
`;

const Description = styled.div`
  font-size: 12px;
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
`;

const BottomBar = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  padding-top: 8px;
`;

const Value = styled.div`
  color: ${Colors.red};
  font-size: 14px;
  font-weight: 600;
`;

const Author = styled.div`
  display: inline;
  color: #9d9d9d;
  font-size: 14px;
`;

const Topic = styled.div`
  color: #9d9d9d;
  font-size: 12px;
`;

const ScoreContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Score = styled.div`
  color: ${Colors.darkA};
  text-align: center;
  line-height: 1;
`;

class QuestionEntry extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  renderScoring(postData) {
    const voteIconStyle = {
      fontSize: '24px',
      color: Colors.gray20,
      cursor: 'pointer'
    };

    if (postData.upvoted) {
      voteIconStyle.color = Colors.darkA;
    }

    let upvoteAction;
    if (postData.upvoted) {
      upvoteAction = this.props.clearUpvotePost;
    } else {
      upvoteAction = this.props.upvotePost;
    }

    return (
      <ScoreContainer className="mb-2">
        <FontAwesomeIcon
          icon="angle-up"
          onClick={() => upvoteAction(postData.slugId)}
          style={voteIconStyle}
        />
        <Score className="ml-1">{postData.score ? postData.score : 0}</Score>
      </ScoreContainer>
    );
  }

  onClick() {
    this.props.onClickEntry();
  }

  render() {
    const {
      acceptedReply,
      commentCount,
      title,
      topic,
      value,
      slugId,
      description,
      author
    } = this.props.data;
    const { name } = author;
    console.log('post', this.props.data);

    return (
      <QuestionEntryContainer>
        {acceptedReply && <GreenLabel className="mb-1">Awarded</GreenLabel>}
        <div className="d-flex">
          <div className="pr-3 d-flex flex-column align-items-center">
            {this.renderScoring(this.props.data)}
            <Value className="mb-1">${value.toFixed(2)}</Value>
          </div>
          <Content>
            <FlexContainer>
              <div>
                <StyledLink onClick={this.onClick} to={`/post/${slugId}`}>
                  <Title>{title}</Title>
                </StyledLink>
                <div className="my-1">
                  <StyledLink
                    underline
                    onClick={this.onClick}
                    to={`/profile/${author.slugId}`}
                    style={{ textDecorationColor: '#9d9d9d' }}
                  >
                    <Author>{name}</Author>
                  </StyledLink>
                </div>
                <Description>{description}</Description>
              </div>
            </FlexContainer>
            <BottomBar>
              <Topic>{topic}</Topic>

              {commentCount && (
                <div className="ml-2">{commentCount} Comments</div>
              )}
            </BottomBar>
          </Content>
        </div>
      </QuestionEntryContainer>
    );
  }
}

export default withRouter(QuestionEntry);
