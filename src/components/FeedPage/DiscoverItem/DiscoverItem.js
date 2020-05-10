import React, { Component } from 'react';
import cx from 'classnames';
import styles from './DiscoverItem.scss';

class DiscoverItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // this.props.fetchData();
  }

  render() {
    const { props } = this;
    const paneStyle = { ...props.style };

    if (props.itemSize) {
      paneStyle.width = `120px`;
      paneStyle.height = `100px`;
    }
    if (props.active) console.log('active', props.title);
    return (
      <div className="mb-2" key={props.title}>
        <div
          className={cx(styles.pane, props.paneClass, {
            [styles.active]: props.active
          })}
          style={paneStyle}
        >
          <div className={styles.title}>{props.title}</div>
        </div>
      </div>
    );
  }
}

export default DiscoverItem;
