import React, { Component } from 'react';
import styled from 'styled-components';
import Colors from '../styles/Colors';
import ProfileIcon from '@material-ui/icons/Edit';
import PriorityHigh from '@material-ui/icons/PriorityHigh';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GreenLabel from '../General/GreenLabel';

const ButtonFlex = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.div`
  display: inline-flex;
  align-items: center;
  border-radius: 4px;
  color: ${Colors.darkA};
  cursor: pointer;
  font-weight: 500;
  padding 8px;
  margin-left: -4px;
  &:hover {
    background: #efefef;
  }
`;

const ButtonText = styled.div``;

const Exclamation = styled(PriorityHigh)`
  cursor: pointer;
  color: ${Colors.gray20};
  &:hover {
    color: ${Colors.headerDark};
  }
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

const renderScoring = (upvotePost, clearUpvotePost, postData) => {
  const voteIconStyle = {
    fontSize: '24px',
    color: Colors.gray20,
    cursor: 'pointer'
  };

  if (postData.upvoted) {
    voteIconStyle.color = Colors.darkGreen;
  }

  let upvoteAction;
  if (postData.upvoted) {
    upvoteAction = clearUpvotePost;
  } else {
    upvoteAction = upvotePost;
  }

  return (
    <ScoreContainer className="mr-3">
      <FontAwesomeIcon
        icon="angle-up"
        onClick={() => upvoteAction(postData.slugId)}
        style={voteIconStyle}
      />
      <Score className="ml-2">{postData.score ? postData.score : 0}</Score>
    </ScoreContainer>
  );
};

const ActionButtons = ({
  postData,
  upvotePost,
  clearUpvotePost,
  onClickAnswer,
  onClickReport
}) => {
  return (
    <ButtonFlex>
      {renderScoring(upvotePost, clearUpvotePost, postData)}
      <Button onClick={onClickAnswer}>
        <ProfileIcon
          style={{
            fontSize: '16px',
            color: Colors.darkA,
            marginRight: '0.25rem'
          }}
        />
        <span>Answer</span>
      </Button>
      <Exclamation className="ml-2" onClick={onClickReport} />
      {postData.acceptedReply && (
        <GreenLabel className="ml-2">Awarded</GreenLabel>
      )}
    </ButtonFlex>
  );
};

export default ActionButtons;
