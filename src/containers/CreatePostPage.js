import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import { updateComposeField, submitPost } from '../actions/newPostActions';
import { fetchUserBalance } from '../actions/authActions';
import PostEditor from '../components/NewPost/PostEditor';
import Button from '../components/General/Button';
import H2 from '../components/General/H2';

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

class NewPostPageContainer extends Component {
  constructor(props) {
    super(props);
    this.onClickPostQuestion = this.onClickPostQuestion.bind(this);
  }

  componentDidMount() {
    this.props.fetchUserBalance();
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
      createdId
    } = this.props;

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
          />
          <div style={{ marginTop: '0.75em' }}>
            <Button onClick={submitPost}>Submit</Button>
          </div>
        </EditorWrapper>
        <SideBarWrapper>
          <SideBar>
            <ul style={{ paddingLeft: '20px', marginBottom: '0rem' }}>
              <li>
                Your post should clearly describe what it is you are looking
                for.
              </li>
              <li>
                In your description detail the type of answer which you will
                award the bounty to.
              </li>
            </ul>
            <Label>Rules</Label>
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

function mapStateToProps({ compose, auth }) {
  return {
    loggedIn: auth.loggedIn,
    user: auth.user,
    title: compose.title,
    description: compose.description,
    value: compose.value,
    postCreated: compose.postCreated,
    createdId: compose.createdId
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchUserBalance,
      updateComposeField,
      submitPost
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPostPageContainer);
