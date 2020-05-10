import React, { Component } from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import cx from 'classnames';
import styles from './AboutPage.scss';
// import emailValidate from '../../util/emailValidate';
import axios from 'axios';

class AboutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeCategory: 0,
      searchFocused: false,
      hideFilters: true,
      customerItemsVisible: false,
      email: '',
      message: ''
    };

    this.customerItemsVisible = this.customerItemsVisible.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  triggerAnimation(animation, isVisible) {
    if (this.state[animation] || !isVisible) return;
    this.setState({ [animation]: true });
  }

  customerItemsVisible(isVisible) {
    if (this.state.customerItemsVisible || !isVisible) return;
    this.setState({ customerItemsVisible: true });
  }

  validateForm(email, message) {
    let isValid = true;
    const validEmail = true; //emailValidate(email);
    if (!validEmail) {
      this.setState({ emailError: true });
      isValid = false;
    }
    const validMessage = message.length > 0;
    if (!validMessage) {
      this.setState({ messageError: true });
      isValid = false;
    }
    return isValid;
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, message } = this.state;
    //const isValid = this.validateForm(email, message);
    if (isValid) {
      axios.post('/api/contact', { email, message }).then(res => {
        if (res.status === 200) {
          this.setState({ submitSuccess: true });
        }
      });
    }
    console.log('Submitting', email, message);
  }

  render() {
    const { props, state } = this;

    const ringSquare = (
      <div className={styles.outerRing}>
        <div className={styles.ring}>
          <div className={cx(styles.square, styles.smallSquare)}>
            <div className={cx(styles.cornerDark, styles.smallCorner)} />
            <div className={cx(styles.cornerLight, styles.smallCorner)} />
            <div className={cx(styles.cornerLight, styles.smallCorner)} />
            <div className={cx(styles.cornerDark, styles.smallCorner)} />
          </div>
        </div>
      </div>
    );

    return (
      <div style={{ marginTop: '-24px' }} className={styles.root}>
        <section className={cx(styles.section, styles.darkSection)}>
          <div className={cx('container-fluid', styles.content)}>
            <div
              className={cx(
                styles.displayContainer,
                styles.headerSectionAnimation
              )}
            >
              <div
                className={cx(
                  'col-12 col-sm-4 mb-2 mb-sm-0',
                  styles.phoneContainer
                )}
              >
                <div style={{ fontSize: '84px' }}>$</div>
              </div>

              <div className={cx(styles.copy, 'col')}>
                <div className={cx(styles.headerText, 'mb-1')}>
                  Bounty allows you to offer monetary rewards for your
                  questions.
                </div>
                <div className={styles.subText}>
                  Receive quality and timely responses to your problems and
                  queries by offering an incentive to users to help you.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={cx(styles.section, styles.whiteSection)}>
          <div className={cx('container-fluid', styles.content)}>
            <div className={styles.heading}>Site Rules</div>

            <div className={styles.detailContainer}>
              <div className={cx(styles.copy, 'col')}>
                <div className={styles.mainText}>
                  Rules on posting questions
                </div>
                <div className={styles.subText}>
                  Your post should clearly describe what it is you are looking
                  for. Your post should be relevant to the topic selected and
                  not contain inappropriate or hateful content. In your
                  description detail the type of answer which you will award the
                  bounty to. Users may report you if you fail to award the
                  bounty when a quality answer has been provided. This possibly
                  lead to account suspension.
                </div>
              </div>
            </div>

            <div className={styles.detailContainer}>
              <div className={cx(styles.copy, 'col')}>
                <div className={styles.mainText}>
                  Rules on responding to questions
                </div>
                <div className={styles.subText}>
                  Responses must make a meaningful effort to respond to the
                  question. Responses must be on topic. Low effort responses are
                  not permitted. Any abusive behaviour contained in comments is
                  not permitted. If you encounter a comment violating these
                  rules, please file a report against the comment by clicking on
                  the report icon.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={cx(styles.section, styles.darkSection)}>
          <div className={cx('container-fluid', styles.content)}>
            <div className={styles.heading}>Frequently Asked Questions</div>
            <div className={styles.detailContainer}>
              <div className={cx(styles.copy, 'col')}>
                <div className={styles.mainText}>
                  How do I win the bounties for posts?
                </div>
                <div className={styles.subText}>
                  Simply respond to questions with a quality and correct answer,
                  providing the post author with what they are looking for. The
                  post author will award the bounty to the response which best
                  answers a question
                </div>
              </div>
            </div>

            <div className={styles.detailContainer}>
              <div className={cx(styles.copy, 'col')}>
                <div className={styles.mainText}>
                  What if a user fails to award the bounty when a quality answer
                  is given?
                </div>
                <div className={styles.subText}>
                  If a user is withholding their bounty without justification
                  you can file a report against them. Look for the report icon
                  on their post, select the appropriate reason and provide and
                  explanation of why they are failing to award the bounty. Our
                  moderators will review the report and make a decision.
                </div>
              </div>
            </div>

            <div className={styles.detailContainer}>
              <div className={cx(styles.copy, 'col')}>
                <div className={styles.mainText}>
                  Can I take back a bounty after rewarding it if I later find
                  the accepted answer lacking?
                </div>
                <div className={styles.subText}>
                  No. In order to avoid fraudulent behaviour, awarding a bounty
                  is final.
                </div>
              </div>
            </div>

            <div className={styles.detailContainer}>
              <div className={cx(styles.copy, 'col')}>
                <div className={styles.mainText}>
                  How do I add to my account balance?
                </div>
                <div className={styles.subText}>
                  Adding to your account balance is done on the profile page.
                  Click the option to add to your balance and select the amount.
                </div>
              </div>
            </div>

            <div className={styles.detailContainer}>
              <div className={cx(styles.copy, 'col')}>
                <div className={styles.mainText}>
                  How do I change my profile information?
                </div>
                <div className={styles.subText}>
                  When logged in, click on the profile tab. To edit your name,
                  click on the pen icon next to your name. To edit your
                  credentials and employment information, hover over them and an
                  edit button will appear.
                </div>
              </div>
            </div>

            <div className={styles.detailContainer}>
              <div className={cx(styles.copy, 'col')}>
                <div className={styles.mainText}>Is my profile public?</div>
                <div className={styles.subText}>
                  Yes. All profile information is visible to other users. This
                  is to communicate your expertise and credentials and to build
                  trust between users.
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default AboutPage;
