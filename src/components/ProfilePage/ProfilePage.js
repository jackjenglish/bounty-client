import React, { Component } from 'react';
import styled from 'styled-components';
import ProfilePost from './ProfilePost';
import ProfileComment from './ProfileComment';
import ProfileInfo from './ProfileInfo';
import { Route, Link } from 'react-router-dom';
import Colors from '../styles/Colors';
import StyledLink from '../General/StyledLink';

const PageContainer = styled.div`
  max-width: 660px;
  margin: 0 auto;
`;

const ContentWrapper = styled.div`
  background: #fff;
  paddingtop: 0.75rem;
  border-radius: 4px;
`;

export const Tab = styled(StyledLink)`
  color: #37352f;
  font-weight: 500;
  font-size: 1em;
  border-bottom: ${({ active }) =>
    active ? '2px solid rgba(34, 34, 34, 0.2)' : '0px'};
  cursor: pointer;
`;

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = { activeTab: 'posts' };
    this.maybeRenderEditProfile = this.maybeRenderEditProfile.bind(this);
  }

  componentDidMount() {
    const { id, name } = this.props.match.params;
    this.props.fetchProfile(id);
  }

  userOwnsProfile() {
    const { profile, loggedIn, user } = this.props;
    return loggedIn && profile._id === user._id;
  }

  maybeRenderEditProfile() {
    const { profile, loggedIn, user } = this.props;
    if (loggedIn && profile._id === user._id) {
      // User owns profile
      return <div>Edit</div>;
    }
  }

  renderLoadingState() {
    return <PageContainer>Loading...</PageContainer>;
  }

  isActive(slug) {
    const { match, location } = this.props;
    if (slug === 'comments') {
      return (
        match.url === location.pathname ||
        location.pathname === `${match.url}/comments`
      );
    }
    if (slug === 'posts') {
      return location.pathname === `${match.url}/posts`;
    }
    return false;
  }

  render() {
    if (this.props.loading) {
      return this.renderLoadingState();
    }

    // console.log('profile', this.props);

    const { email, name, slugId, posts, comments } = this.props.profile;
    const { match, fieldsUpdating } = this.props;

    return (
      <PageContainer>
        <ProfileInfo
          profile={this.props.profile}
          fieldsUpdating={fieldsUpdating}
          userOwnsProfile={this.userOwnsProfile()}
          editProfile={this.props.editProfile}
          uploadProfileImage={this.props.uploadProfileImage}
          profoUploading={this.props.profoUploading}
        />
        <ContentWrapper
          style={{
            background: '#FFF',
            paddingTop: '0.75rem'
            // boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '0.75rem'
            }}
          >
            <div style={{ padding: '0 8px' }}>
              <Tab
                active={this.isActive('comments')}
                to={`${match.url}/comments`}
              >
                Comments
              </Tab>
            </div>
            <div style={{ padding: '0 8px' }}>
              <Tab active={this.isActive('posts')} to={`${match.url}/posts`}>
                Posts
              </Tab>
            </div>
          </div>

          <Route
            exact
            path={[match.url, `${match.url}/comments`]}
            render={() => {
              if (comments.length < 1) {
                return (
                  <div
                    style={{ borderTop: '1px solid #eaeaea', padding: '1rem' }}
                  >
                    This user has no comments
                  </div>
                );
              }

              return comments.map(comment => (
                <ProfileComment
                  author={{
                    name
                  }}
                  comment={comment}
                  key={comment._id}
                />
              ));
            }}
          />
          <Route
            path={`${match.url}/posts`}
            render={() => {
              if (posts.length < 1) {
                return (
                  <div
                    style={{ borderTop: '1px solid #eaeaea', padding: '1rem' }}
                  >
                    This user has no posts
                  </div>
                );
              }

              return posts.map(post => (
                <ProfilePost data={post} key={post.title} />
              ));
            }}
          />
        </ContentWrapper>
      </PageContainer>
    );
  }
}

export default ProfilePage;
