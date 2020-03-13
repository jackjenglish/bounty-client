import React, { Component } from 'react';
import styles from './EditableProfileField.scss';
import cx from 'classnames';
import EditIcon from '@material-ui/icons/Edit';
import Button from '../General/Button';

class EditableProfileField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editHover: false,
      editMode: false
    };

    this.onEditButtonEnter = this.onEditButtonEnter.bind(this);
    this.onEditButtonLeave = this.onEditButtonLeave.bind(this);
    this.onEditButtonClick = this.onEditButtonClick.bind(this);
  }

  onEditButtonEnter() {
    this.setState({ editHover: true });
  }

  onEditButtonLeave() {
    this.setState({ editHover: false });
  }

  onEditButtonClick() {
    this.setState(prevState => ({ editMode: !prevState.editMode }));
  }

  render() {
    const props = this.props;
    const value = props.value;
    const activeClass = styles.activeCategory;

    const iconStyle = {
      fontSize: '16px'
    };

    let type = 'text';
    if (props.numberInput) type = 'number';

    return (
      <div className={styles.root}>
        <div
          className={cx(styles.categoryNameContainer, {
            [activeClass]: this.props.isActive
          })}
          onClick={this.props.onSelect}
        >
          {this.state.editMode ? (
            <input
              type={type}
              name="fname"
              value={value}
              onChange={evt => this.props.onChange(evt.target.value)}
              onKeyPress={e => {
                if (e.key === 'Enter') e.target.blur();
              }}
              className={cx(styles.textInput, {
                [styles.lightFont]: props.lightFont
              })}
              autoFocus
              onBlur={() => {
                //this.setState({ editMode: false, editHover: false });
              }}
            />
          ) : (
            <div
              className={cx(
                styles.value,
                { [styles.editable]: this.state.editHover },
                { [styles.lightFont]: props.lightFont }
              )}
            >
              {value}
            </div>
          )}
        </div>
        {!this.state.editMode && (
          <div
            onMouseEnter={this.onEditButtonEnter}
            onMouseLeave={this.onEditButtonLeave}
            onClick={this.onEditButtonClick}
          >
            <EditIcon className={styles.icon} style={iconStyle} />
          </div>
        )}
        {this.state.editMode && (
          <div className="ml-2">
            <Button className="mr-1" size="small">
              Save
            </Button>
            <Button
              type="secondary"
              size="small"
              onClick={() => {
                this.setState({ editMode: false, editHover: false });
              }}
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default EditableProfileField;
