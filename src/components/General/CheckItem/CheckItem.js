import React from 'react';
import Check from '@material-ui/icons/Check';
import cx from 'classnames';
import styles from './CheckItem.scss';

const CheckItem = props => {
  const selectedMarkStyle = {
    opacity: '0',
    color: '#339966',
    fontSize: '14px'
  };

  if (props.checked) selectedMarkStyle.opacity = '1';

  return (
    <div
      className={cx(styles.checkItem, {
        [styles.checkItemMobile]: props.isMobile,
        [styles.checkFirstLayout]: props.layout === 'check-first'
      })}
      onClick={() => props.toggle(!props.checked)}
      key={props.value}
    >
      {props.layout === 'check-first' && (
        <div className={cx(styles.checkInput, 'mr-2')}>
          <Check style={selectedMarkStyle} />
        </div>
      )}
      <div className={styles.checkLabel} style={props.textStyle}>
        {props.value}
      </div>
      {props.layout !== 'check-first' && (
        <div className={styles.checkInput}>
          <Check style={selectedMarkStyle} />
        </div>
      )}
    </div>
  );
};

export default CheckItem;
