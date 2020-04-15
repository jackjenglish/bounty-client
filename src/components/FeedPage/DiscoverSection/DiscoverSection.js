import React, { Component } from 'react';
import cx from 'classnames';
import styles from './DiscoverSection.scss';
import DiscoverItem from '../DiscoverItem/DiscoverItem';
import ExpandIcon from '@material-ui/icons/KeyboardArrowRight';

class DiscoverSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentOffset: 0,
      translatePos: 0,
      itemSize: 120
    };

    this.slideButton = this.slideButton.bind(this);
  }

  getDiscoverStyle() {
    const style = {};
    let translationOffset = this.state.currentOffset;
    style.transform = 'translateY(' + translationOffset + 'px)';
    style.transition = 'transform 0.35s';

    return style;
  }

  slideButton(direction) {
    this.setState(prevState => {
      let newOffset;
      if (direction === 'left') {
        newOffset =
          prevState.translatePos + this.displayRow.offsetHeight * 0.75;
      } else {
        newOffset =
          prevState.translatePos - this.displayRow.offsetHeight * 0.75;
      }

      const upperTranslateLimit =
        this.displayRow.offsetHeight - this.scrollContainer.offsetHeight - 8;

      if (newOffset < upperTranslateLimit) {
        newOffset = upperTranslateLimit; // Hit End of Horizontal Scroll
      }

      if (newOffset > 0) newOffset = 0; // Stop user scrolling back past start
      this.setState({
        currentOffset: newOffset,
        translatePos: newOffset,
        animate: true
      });
    });
  }

  render() {
    const { props } = this;

    const paneColor = [styles.paneDark, styles.paneGreen];
    const discoverItems = this.props.items.map((item, index) => {
      const itemStyles = [
        { background: 'linear-gradient(rgb(247, 220, 88), rgb(254, 161, 22))' },
        { background: 'linear-gradient(#a756ef, #160722)' },
        { background: 'linear-gradient(#2193b0, #6dd5ed)' },
        { background: 'linear-gradient(#ff0099, #493240)' },
        { background: 'linear-gradient(#0F2027, #2C5364)' },
        { background: 'linear-gradient(#8E2DE2, #4A00E0)' }
      ];
      const itemStyle = itemStyles[index % itemStyles.length];

      return (
        <div key={item} onClick={() => this.props.onItemClick(item)}>
          <DiscoverItem
            title={item}
            key={item}
            style={itemStyle}
            itemSize={this.state.itemSize}
          />
        </div>
      );
    });

    const discoverStyle = this.getDiscoverStyle(this.state.animate);
    const canScrollBack = this.state.currentOffset < 0;

    return (
      <div
        className="container-fluid px-0"
        style={{ overflow: 'hidden', height: '100%' }}
        // ref={input => {
        //   this.displayRow = input;
        // }}
      >
        {props.heading && <div className={styles.heading}>{props.heading}</div>}
        <div
          className={cx(
            'd-none d-md-flex',
            styles.slideButton,
            styles.slideLeft
          )}
          onClick={() => this.slideButton('left')}
        >
          <ExpandIcon
            style={{
              fontSize: '32px',
              // color: '#fff',
              transform: 'rotate(270deg)'
            }}
            className={styles.buttonIcon}
          />
        </div>
        <div
          style={{ overflow: 'hidden', maxHeight: '500px' }}
          className={cx('d-flex', styles.sliderContainer)}
          ref={input => {
            this.displayRow = input;
          }}
        >
          <div
            style={{ height: 'fit-content' }}
            className={cx('d-flex', styles.displayRow)}
          >
            <div
              // style={{ height: 'fit-content' }}
              className={styles.discover}
              style={{ ...discoverStyle, height: 'fit-content' }}
              ref={input => {
                this.scrollContainer = input;
              }}
            >
              {discoverItems}
            </div>
          </div>
        </div>
        <div
          className={cx(
            'd-none d-md-flex',
            styles.slideButton,
            styles.slideRight
          )}
          onClick={() => this.slideButton('right')}
        >
          <ExpandIcon
            style={{
              fontSize: '32px',
              // color: '#fff',
              transform: 'rotate(90deg)'
            }}
            className={styles.buttonIcon}
          />
        </div>
      </div>
    );
  }
}

export default DiscoverSection;
