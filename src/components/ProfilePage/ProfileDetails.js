import React, { Component } from 'react';
import styled from 'styled-components';
import Colors from '../styles/Colors';
import WorkIcon from '@material-ui/icons/Work';
import SchoolIcon from '@material-ui/icons/School';
import ProfileDetailsEditor from './ProfileDetailsEditor';

const Credential = styled.div`
  font-size: 14px;
`;

const EditButton = styled.div`
  display: inline-block;
  color: ${Colors.grayQuora};
  text-decoration: underline;
  cursor: pointer;
  opacity: ${({ show }) => (show ? '1' : '0')};
`;

class ProfileDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { editMode: false };
    this.onChange = this.onChange.bind(this);
    this.onClickEdit = this.onClickEdit.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.updating && !this.props.updating) {
      this.setState({ editMode: false });
    }
  }

  onClickEdit() {
    if (this.state.updating) return;
    this.setState({ editMode: true });
  }

  cancelEdit() {
    if (this.state.updating) return;
    this.setState({ editMode: false });
  }

  onChange(evt) {
    this.setState({ value: evt.target.value });
  }

  render() {
    const { bio, employment, education } = this.props.profile;

    if (this.state.editMode) {
      return (
        <ProfileDetailsEditor
          bio={bio}
          employment={employment}
          education={education}
          editProfile={editData => this.props.editProfile(editData)}
          cancel={this.cancelEdit}
          updating={this.props.updating}
        />
      );
    }

    return (
      <div
        className="mb-2"
        onMouseEnter={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
      >
        <div className="mb-2">{bio}</div>
        <div className="d-flex align-items-center">
          <WorkIcon style={{ fontSize: '18px' }} className="mr-1" />
          <Credential>
            {employment ? employment : 'Add your employment'}
          </Credential>
        </div>

        <div className="d-flex align-items-center">
          <SchoolIcon style={{ fontSize: '18px' }} className="mr-1" />
          <Credential>
            {education ? education : 'Add your education'}
          </Credential>
        </div>
        {this.props.userOwnsProfile && (
          <EditButton show={this.state.hover} onClick={this.onClickEdit}>
            Edit
          </EditButton>
        )}
      </div>
    );
  }
}

export default ProfileDetails;
