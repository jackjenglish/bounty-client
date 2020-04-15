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

  getCustomerItem(count, isVisible) {
    const items = [];
    for (let i = 0; i < count; i += 1) {
      items.push(
        <div
          className={cx(
            styles.customerItemContainer,
            'col-12 col-sm-6 col-md-4'
          )}
        >
          <div className={cx(styles.visualContainer)}>
            <div
              className={cx(
                styles.square,
                { [styles.toAnimate]: i % 2 === 1 },
                { [styles.rotateAnimation]: i % 2 === 1 && isVisible }
              )}
            >
              <div className={styles.cornerDark} />
              <div className={styles.cornerLight} />
              <div className={styles.cornerLight} />
              <div className={styles.cornerDark} />
            </div>
          </div>

          <div className={cx(styles.custCopy)}>
            <div className={styles.custText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </div>
          </div>
        </div>
      );
    }
    return items;
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
      <div className={styles.root}>
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
                <div style={{ fontSize: '48px' }}>$</div>
                {/* <img className={styles.phone} src="/static/phone.png" /> */}
              </div>

              <div className={cx(styles.copy, 'col')}>
                <div className={cx(styles.headerText, 'mb-1')}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </div>
                <div className={styles.subText}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={cx(styles.section, styles.whiteSection)}>
          <div className={cx('container-fluid', styles.content)}>
            <div className={styles.heading}>
              Benefits from a user perspective
            </div>

            <div className={styles.detailContainer}>
              <VisibilitySensor
                delayedCall
                partialVisibility
                onChange={isVisible =>
                  this.triggerAnimation('ringSquareAnimation', isVisible)
                }
              >
                <div
                  className={cx(
                    styles.visualContainer,
                    'col-12 col-sm-3 mb-2 mb-sm-0',
                    styles.ringSquare,
                    {
                      [styles.ringSquareAnimation]: this.state
                        .ringSquareAnimation
                    }
                  )}
                >
                  {ringSquare}
                </div>
              </VisibilitySensor>
              <div className={cx(styles.copy, 'col')}>
                <div className={styles.mainText}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </div>
                <div className={styles.subText}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </div>
              </div>
            </div>

            <div className={styles.detailContainer}>
              <div
                className={cx(
                  styles.copy,
                  'col',
                  'order-1 order-sm-0',
                  styles.copyAnimationInitial,
                  { [styles.copyAnimation]: this.state.copy2 }
                )}
              >
                <div className={styles.mainText}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </div>
                <div className={styles.subText}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </div>
              </div>

              <VisibilitySensor
                delayedCall
                partialVisibility
                onChange={isVisible =>
                  this.triggerAnimation('ringSquareAnimation2', isVisible)
                }
              >
                <div
                  className={cx(
                    styles.visualContainer,
                    'col-12 col-sm-3 mb-2 mb-sm-0',
                    styles.ringSquareRight,
                    {
                      [styles.ringSquareAnimationRight]: this.state
                        .ringSquareAnimation2
                    }
                  )}
                >
                  {ringSquare}
                </div>
              </VisibilitySensor>
            </div>

            <div className={styles.detailContainer}>
              <VisibilitySensor
                delayedCall
                partialVisibility
                onChange={isVisible =>
                  this.triggerAnimation('ringSquareAnimation3', isVisible)
                }
              >
                <div
                  className={cx(
                    styles.visualContainer,
                    'col-12 col-sm-3 mb-2 mb-sm-0',
                    styles.ringSquare,
                    {
                      [styles.ringSquareAnimation]: this.state
                        .ringSquareAnimation3
                    }
                  )}
                >
                  {ringSquare}
                </div>
              </VisibilitySensor>
              <div className={cx(styles.copy, 'col')}>
                <div className={styles.mainText}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </div>
                <div className={styles.subText}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={cx(styles.section, styles.darkSection)}>
          <div className={cx('container-fluid', styles.content)}>
            <VisibilitySensor delayedCall onChange={this.customerItemsVisible}>
              <div className={styles.heading}>
                Benefits from a customer perspective
              </div>
            </VisibilitySensor>

            <div className={styles.customerItems}>
              {this.getCustomerItem(6, this.state.customerItemsVisible)}
            </div>
          </div>
        </section>

        <section className={cx(styles.section, styles.whiteSection)}>
          <div className={cx('container-fluid', styles.content)}>
            <div className={styles.heading}>Contact Us</div>
            <form onSubmit={this.handleSubmit}>
              <div className={styles.formContainer}>
                {state.emailError && (
                  <div className={styles.error}>Enter a valid email</div>
                )}
                <div className={styles.inputRow}>
                  <input
                    className={styles.inputForm}
                    placeholder="Email"
                    onChange={evt => this.setState({ email: evt.target.value })}
                    value={state.email}
                    name="email"
                    type="text"
                  />
                </div>
                {state.messageError && (
                  <div className={styles.error}>Write a message!</div>
                )}
                <div className={styles.inputRow}>
                  <textarea
                    className={styles.inputForm}
                    placeholder="Get in touch"
                    onChange={evt =>
                      this.setState({ message: evt.target.value })
                    }
                    value={state.message}
                    rows="4"
                  />
                </div>

                <div className={styles.submitContainer}>
                  <input
                    type="submit"
                    className={styles.button}
                    onClick={this.props.submitLogin}
                    value="Submit"
                  />
                </div>
              </div>
            </form>
            <div
              className={cx(styles.success, {
                [styles.showSuccess]: state.submitSuccess
              })}
            >
              Thanks for getting in touch!
            </div>
          </div>
        </section>

        <section className={cx(styles.section, styles.darkSection)}>
          <div className={cx('container-fluid', styles.content)}>
            <div className={styles.heading}>Frequently Asked Questions</div>
            <div className={styles.detailContainer}>
              <div className={cx(styles.copy, 'col')}>
                <div className={styles.mainText}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua?
                </div>
                <div className={styles.subText}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </div>
              </div>
            </div>

            <div className={styles.detailContainer}>
              <div className={cx(styles.copy, 'col')}>
                <div className={styles.mainText}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua?
                </div>
                <div className={styles.subText}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </div>
              </div>
            </div>

            <div className={styles.detailContainer}>
              <div className={cx(styles.copy, 'col')}>
                <div className={styles.mainText}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua?
                </div>
                <div className={styles.subText}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </div>
              </div>
            </div>

            <div className={styles.detailContainer}>
              <div className={cx(styles.copy, 'col')}>
                <div className={styles.mainText}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua?
                </div>
                <div className={styles.subText}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
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
