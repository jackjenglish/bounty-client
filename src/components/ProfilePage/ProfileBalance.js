import React, { Component } from 'react';
import styled from 'styled-components';
import Colors from '../styles/Colors';
import AddToBalance from './AddToBalance';

const EditButton = styled.div`
  display: inline-block;
  color: ${Colors.grayQuora};
  text-decoration: underline;
  cursor: pointer;
`;

const Value = styled.div`
  color: ${Colors.red};
  font-size: 16px;
  font-weight: 600;
`;

class ProfileBalance extends Component {
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
    const { profile, userOwnsProfile } = this.props;
    const balance = profile.balance >= 0 ? profile.balance : 0;

    if (this.state.editMode) {
      return (
        <AddToBalance
          balance={profile.balance}
          editProfile={editData => this.props.editProfile(editData)}
          cancel={this.cancelEdit}
          updating={this.props.updating}
        />
      );
    }

    return (
      <div
        className="mb-1 d-flex"
        //onMouseEnter={() => this.setState({ hover: true })}
        //onMouseLeave={() => this.setState({ hover: false })}
      >
        <div className="d-flex mr-2">
          <Value>{`$${balance.toFixed(2)}`}</Value>
        </div>
        {userOwnsProfile && (
          <EditButton onClick={this.onClickEdit}>Add Balance</EditButton>
        )}
      </div>
    );
  }
}

export default ProfileBalance;
