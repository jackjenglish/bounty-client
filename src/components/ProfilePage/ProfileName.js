import React, { Component } from 'react';
import styled from 'styled-components';
import Colors from '../styles/Colors';
import Button from '../General/Button';
import H2 from '../General/H2';
import styles from './EditableProfileField.scss';
import cx from 'classnames';
import EditIcon from '@material-ui/icons/Edit';

const FadeContainer = styled.div`
  opacity: ${({ updating }) => (updating ? '0.4' : '1')};
`;

class ProfileBio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editHover: false,
      editMode: false
    };

    this.onEditButtonEnter = this.onEditButtonEnter.bind(this);
    this.onEditButtonLeave = this.onEditButtonLeave.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClickEdit = this.onClickEdit.bind(this);
    this.saveName = this.saveName.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.renderEditActions = this.renderEditActions.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.updating && !this.props.updating) {
      this.setState({ editMode: false, editHover: false });
    }
  }

  onEditButtonEnter() {
    this.setState({ editHover: true });
  }

  onEditButtonLeave() {
    this.setState({ editHover: false });
  }

  onClickEdit() {
    if (this.state.updating) return;
    this.setState({ editMode: true, value: this.props.value });
  }

  cancelEdit() {
    if (this.state.updating) return;
    this.setState({ editMode: false, editHover: false });
  }

  onChange(evt) {
    this.setState({ value: evt.target.value });
  }

  saveName() {
    this.props.editProfile({ name: this.state.value });
  }

  renderEditActions() {
    if (this.state.editMode) {
      return (
        <div className="ml-2">
          <Button className="mr-1" size="small" onClick={this.saveName}>
            Save
          </Button>
          <Button type="secondary" size="small" onClick={this.cancelEdit}>
            Cancel
          </Button>
        </div>
      );
    }

    return (
      <div
        onMouseEnter={this.onEditButtonEnter}
        onMouseLeave={this.onEditButtonLeave}
        onClick={this.onClickEdit}
      >
        <EditIcon className={styles.icon} style={{ fontSize: '16px' }} />
      </div>
    );
  }

  render() {
    const { props } = this;
    const { value, userOwnsProfile, updating } = this.props;

    if (userOwnsProfile) {
      const activeClass = styles.activeCategory;

      return (
        <FadeContainer updating={updating} className="d-flex mb-2">
          <div className={styles.root}>
            <div
              className={cx(styles.categoryNameContainer, {
                [activeClass]: this.props.isActive
              })}
              onClick={this.props.onSelect}
            >
              {this.state.editMode ? (
                <input
                  type="text"
                  name="fname"
                  value={this.state.value}
                  onChange={this.onChange}
                  onKeyPress={e => {
                    if (e.key === 'Enter') e.target.blur();
                  }}
                  className={cx(styles.textInput, {
                    [styles.lightFont]: props.lightFont
                  })}
                  autoFocus
                />
              ) : (
                <div
                  className={cx(
                    styles.value,
                    { [styles.editable]: this.state.editHover },
                    { [styles.lightFont]: props.lightFont }
                  )}
                >
                  {this.props.value}
                </div>
              )}
            </div>
            {this.renderEditActions()}
          </div>
        </FadeContainer>
      );
    }

    return <H2 className="mb-2">{value}</H2>;
  }
}

export default ProfileBio;
