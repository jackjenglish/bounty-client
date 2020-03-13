import React, { Component } from 'react';
import styled, { keyframes, css } from 'styled-components';
import Modal from '../General/Modal';
import Button from '../General/Button';
import TextArea from '../General/TextArea';

const Input = styled.input`
  padding: 8px 10px;
  border: 1px solid rgba(34, 34, 34, 0.2);
  border-radius: 4px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
`;

const Label = styled.div`
  font-weight: 600;
`;

class ProfileDetailsEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bio: props.bio,
      education: props.education,
      employment: props.employment
    };

    this.updateField = this.updateField.bind(this);
    this.save = this.save.bind(this);
  }

  updateField(evt) {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  }

  save() {
    if (this.props.updating) return;

    this.props.editProfile({
      bio: this.state.bio,
      education: this.state.education,
      employment: this.state.employment
    });
  }

  render() {
    return (
      <Modal show={true} loading={this.props.updating}>
        <div>
          <Label>Bio</Label>
          <TextArea
            name="bio"
            type="text"
            placeholder="A description about yourself"
            value={this.state.bio}
            onChange={this.updateField}
            rows="3"
          />
        </div>
        <div className="mb-2">
          <Label>Employment</Label>
          <Input
            name="employment"
            type="text"
            placeholder="Designer at Apple"
            value={this.state.employment}
            onChange={this.updateField}
          />
        </div>
        <div>
          <Label>Education</Label>
          <Input
            name="education"
            type="text"
            placeholder="Bsc. Computer Science, UCC"
            value={this.state.education}
            onChange={this.updateField}
          />
        </div>
        <div className="d-flex justify-content-center mt-3">
          <Button className="mr-2" onClick={this.save}>
            Save
          </Button>
          <Button type="secondary" onClick={this.props.cancel}>
            Cancel
          </Button>
        </div>
      </Modal>
    );
  }
}

export default ProfileDetailsEditor;
