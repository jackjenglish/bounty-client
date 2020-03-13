import React, { Component } from 'react';
import styled from 'styled-components';
import QuestionEntry from '../QuestionEntry';
import styles from './FeedPage.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setPostDetail } from '../../actions/feedActions';
import { getPosts } from '../../actions/feedActions';
import Button from '../General/Button';

const Bar = styled.div`
  max-width: 760px;
  margin-bottom: 0.5em;
  display: flex;
  align-items: center;
`;

const ActionBar = ({ user, onClickPostQuestion }) => {
  return (
    <Bar>
      {/* <div style={{ flexGrow: 0 }}></div> */}
      <Button onClick={onClickPostQuestion}>New Post</Button>
    </Bar>
  );
};

export default ActionBar;
