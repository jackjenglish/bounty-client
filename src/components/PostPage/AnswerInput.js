import React, { Component } from 'react';
import styled from 'styled-components';
import Colors from '../styles/Colors';
import ProfileIcon from '@material-ui/icons/AccountCircle';
import Editor from './Editor/Editor';

const Container = styled.div`
  background: #fff;
  padding: 12px 12px 8px 12px;
  margin-bottom: 8px;
  border-bottom: 1px solid #ecf0f1;
`;

const User = styled.div`
  display: inline-flex;
  align-items: center;
  color: ${Colors.darkA};
  font-size: 18px;
`;

const SubmitButton = styled.div`
  display: inline-block;
  border-radius: 4px;
  color: ${Colors.darkA};
  cursor: pointer;
  font-weight: 500;
  padding 8px;
  &:hover {
    background: #efefef;
  }
`;

const AnswerInput = ({ author, commentText, onChange, submit }) => {
  return (
    <Container>
      <div>
        <User>
          <ProfileIcon
            style={{
              fontSize: '24px',
              color: Colors.blueA,
              marginRight: '0.25rem'
            }}
          />
          <span style={{ fontSize: '16px' }}>{author.name}</span>
        </User>
      </div>

      <div>
        <Editor autoFocus onChange={onChange} content={commentText} />
        <div>
          <SubmitButton onClick={submit}>Submit</SubmitButton>
        </div>
      </div>
    </Container>
  );
};

export default AnswerInput;
