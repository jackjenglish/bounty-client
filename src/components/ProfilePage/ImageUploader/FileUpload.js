import React, { Component } from 'react';
import styles from './FileUpload.scss';
import cx from 'classnames';
import UploadPhotoIcon from '@material-ui/icons/AddAPhoto';
import ImageUploader from './ImageUploader.js';

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      imageSrc: '',
      loaded: false,
      selectedFile: null
    };

    this.onDragEnter = this.onDragEnter.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.upload = this.upload.bind(this);
  }

  onDragEnter(e) {
    this.setState({ active: true });
  }

  onDragLeave(e) {
    this.setState({ active: false });
  }

  onDragOver(e) {
    e.preventDefault();
  }

  onDrop(e) {
    e.preventDefault();
    this.setState({ active: false });
    this.onFileChange(e, e.dataTransfer.files[0]);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.loading && !this.props.loading) {
      this.toggleModal();
    }
  }

  onFileChange(e, file) {
    file = file || e.target.files[0];

    const reader = new FileReader();

    if (!RegExp(/image/).test(file.type)) {
      alert('File must be an image');
      return;
    }

    this.setState({ loaded: false });

    reader.onload = e => {
      this.setState({
        imageSrc: reader.result,
        loaded: true,
        selectedFile: file
      });
      this.toggleModal();
    };

    reader.readAsDataURL(file);
  }

  upload() {
    const { selectedFile } = this.state;
    this.props.upload(selectedFile);
  }

  toggleModal() {
    const bodyClass = document.body.className;
    if (bodyClass.includes(' modal-open')) {
      document.body.className = bodyClass.replace(' modal-open', '');
      this.setState({ modalOpen: false });
    } else {
      document.body.className += ' modal-open';
      this.setState({ modalOpen: true });
    }
  }

  render() {
    const { state, props } = this;
    return (
      <div>
        <ImageUploader
          open={state.modalOpen}
          upload={this.upload}
          onClose={this.toggleModal}
          imageSrc={this.state.imageSrc}
          loading={props.loading}
        />

        <label
          className={cx(
            styles.uploader,
            { [styles.dishUploader]: props.isDishImage },
            { [styles.loaded]: state.loaded }
          )}
          onDragEnter={this.onDragEnter}
          onDragLeave={this.onDragLeave}
          onDragOver={this.onDragOver}
          onDrop={this.onDrop}
        >
          <img
            src={props.imgSrc}
            className={cx(
              styles.img,
              { [styles.loaded]: props.imgSrc },
              { [styles.dishImg]: props.isDishImage }
            )}
          />
          <i className={cx(styles.icon, styles.iconUpload)} />

          <div
            className={cx(
              styles.uploadImgLabelContainer,
              { [styles.uploadPromptOnHover]: props.imgSrc },
              { [styles.noRadius]: props.isDishImage }
            )}
          >
            <div className="text-center">
              <div className={styles.uploadImgLabel}>Upload Image</div>
              <UploadPhotoIcon style={{ fontSize: '24px', color: '#fff' }} />
            </div>
          </div>

          <input
            type="file"
            onChange={this.onFileChange}
            className={styles.fileInput}
          />
        </label>
      </div>
    );
  }
}

export default FileUpload;
