import React, { Component } from 'react';
import styles from './ImageUploader.scss';
import cx from 'classnames';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '../../General/Button';

class ImageUploader extends Component {
  render() {
    const { props } = this;
    const open = props.open;
    const rootStyle = {};
    if (open) {
      rootStyle.transform = 'translateY(0%)';
      rootStyle.opacity = '1';
    }

    return (
      <div
        id="modalid"
        className={cx(
          styles.modalRoot,
          { 'd-block': open },
          { [styles.modalShow]: open }
        )}
      >
        <div
          className={cx(styles.modalContent, {
            [styles.modalShow]: open
          })}
          style={rootStyle}
        >
          <div>
            <div className={styles.title}>Upload Image</div>
            <div className={styles.contentContainer}>
              <div className={styles.imgContainer}>
                <img src={props.imageSrc} className={styles.img} />
                {props.loading && (
                  <>
                    <div className={styles.loadingOverlay}></div>
                    <div className={styles.loading}>
                      <CircularProgress
                        size={36}
                        style={{ color: '#1C9B5F' }}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className={styles.buttonContainer}>
              <Button className="mr-2" onClick={props.upload}>
                Save
              </Button>

              <Button
                className={styles.fontHeavy}
                type="secondary"
                onClick={props.onClose}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ImageUploader;
