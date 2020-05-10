import React, { Component } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import PostEditor from './PostEditor';
import Button from '../General/Button';
import H2 from '../General/H2';

const PageContainer = styled.div`
  max-width: 1075px;
  margin: 0 auto;
  display: flex;
`;

const EditorWrapper = styled.div`
  max-width: 760px;
  flex-grow: 1;
  border-right: 1px solid #ecf0f1;
  padding: 1em;
`;

const SideBarWrapper = styled.div``;

const SideBar = styled.div`
  width: 300px;
  background: #ffffff;
  padding: 1em;
`;

const Label = styled.div`
  margin-bottom: 0.25em;
  font-weight: 600;
  font-size: 1em;
`;

class NewPostPage extends Component {
  constructor(props) {
    super(props);
    this.onClickPostQuestion = this.onClickPostQuestion.bind(this);
  }

  componentDidMount() {
    this.props.fetchUserBalance();
    this.props.fetchTopics();
  }

  onClickPostQuestion() {
    this.props.history.push('post');
  }

  render() {
    const {
      title,
      description,
      value,
      user,
      updateComposeField,
      submitPost,
      postCreated,
      createdId,
      topics,
      selectedTopics
    } = this.props;
    console.log('post', this.props);
    if (postCreated) {
      return <Redirect to={`/post/${createdId}`} />;
    }

    return (
      <PageContainer>
        <EditorWrapper>
          <H2>New Post</H2>
          <PostEditor
            user={user}
            updateComposeField={updateComposeField}
            title={title}
            value={value}
            description={description}
            selectedTopics={selectedTopics}
            topics={topics}
          />
          <div style={{ marginTop: '0.75em' }}>
            <Button onClick={submitPost}>Submit</Button>
          </div>
        </EditorWrapper>
        <SideBarWrapper>
          <SideBar>
            <Label>Rules</Label>
            <ul style={{ paddingLeft: '20px', marginBottom: '0rem' }}>
              <li>
                Your post should clearly describe what it is you are looking
                for.
              </li>
              <li>
                Your post should be on topic and not contain inappropriate or
                hateful content.
              </li>
              <li>
                In your description detail the type of answer which you will
                award the bounty to.
              </li>
            </ul>

            <ul style={{ paddingLeft: '20px', marginBottom: '0rem' }}>
              <li>
                Users may report you if you fail to award the bounty when a
                quality answer has been provided. This will hurt your karma
                score and possibly lead to account suspension.
              </li>
            </ul>
          </SideBar>
        </SideBarWrapper>
      </PageContainer>
    );
  }
}

export default NewPostPage;
