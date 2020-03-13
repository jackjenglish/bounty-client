import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/General/Button';
import { logout } from '../actions/authActions';
import { clearFeedbackBar } from '../actions/appActions';
import { withRouter } from 'react-router-dom';
import StyledLink from '../components/General/StyledLink';
import FeedbackBar from '../components/FeedbackBar';
import styles from '../css/TopBar.scss';
import Colors from '../components/styles/Colors';

const TopBarContainer = styled.div`
  height: 48px;
  background: #222222;
  width: 100%;
`;

const Content = styled.div`
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  height: 100%;
`;

const Title = styled.div`
  color: #efefef;
  font-size: 1.5rem;
  font-weight: 600;
`;

const LinkContainer = styled.div`
  padding: 7px 14px;
  height: 100%;
  display: flex;
  align-items: center;
  &:hover {
    color: #646464;
  }
`;

class TopBar extends Component {
  constructor(props) {
    super(props);
    this.onClickLogin = this.onClickLogin.bind(this);
  }

  onClickLogin() {
    this.props.history.push('/login');
  }

  getLinks() {
    const { loggedIn, user } = this.props;
    let links = [
      { value: 'Feed', path: '/feed' },
      { value: 'About', path: '/about' },
      { value: 'Sign In', path: '/login' }
    ];

    if (loggedIn) {
      links = [
        { value: 'Feed', path: '/feed' },
        { value: 'Reports', path: '/reports' },
        { value: 'About', path: '/about' },
        {
          value: 'Profile',
          path: `/profile/${user.slugId}`
        }
      ];
    }

    return links.map(link => {
      const isMatch = () => {
        RegExp(`^${link.path}`).test(this.props.location.pathname) ||
          link.default;
      };

      return (
        <StyledLink
          to={`${link.path}`}
          key={`Nav Item ${link.value}`}
          className={cx(styles.navLink, { [styles.activeLink]: isMatch })}
        >
          <div className={styles.navText}>{link.value}</div>
        </StyledLink>
      );
    });
  }

  render() {
    const { clearFeedbackBar, loggedIn, user, feedback } = this.props;

    return (
      <TopBarContainer>
        {feedback.showFeedbackBar && (
          <FeedbackBar
            clearFeedbackBar={clearFeedbackBar}
            feedback={feedback}
          />
        )}
        <Content className="container">
          <div
            style={{ height: '100%' }}
            className="flex-grow-1 d-flex align-items-center"
          >
            <StyledLink to="/">
              <Title>BOUNTY</Title>
            </StyledLink>
          </div>

          <LinkContainer>
            <StyledLink type="light" to="/">
              Feed
            </StyledLink>
          </LinkContainer>
          {loggedIn && (
            <LinkContainer>
              <StyledLink type="light" to={`/profile/${user.slugId}`}>
                Profile
              </StyledLink>
            </LinkContainer>
          )}
          {loggedIn && (
            <LinkContainer>
              <StyledLink type="light" to={`/reports`}>
                Reports
              </StyledLink>
            </LinkContainer>
          )}
          <div>
            {loggedIn ? (
              <Button size="small" onClick={this.props.logout}>
                Logout
              </Button>
            ) : (
              <Button size="small" onClick={this.onClickLogin}>
                Login
              </Button>
            )}
          </div>
        </Content>
      </TopBarContainer>
    );
  }
}

function mapStateToProps({ auth, feedback }) {
  return {
    loggedIn: auth.loggedIn,
    user: auth.user,
    feedback
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ clearFeedbackBar, logout }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TopBar));
