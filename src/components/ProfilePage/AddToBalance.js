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
      amount: '0.00'
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
    const { amount } = this.state;
    let { balance } = this.props;
    const amountNumber = Number(amount);
    let newBalance = amountNumber;
    if (!isNaN(balance)) {
      newBalance += balance;
    }

    this.props.editProfile({
      balance: newBalance
    });
  }

  render() {
    return (
      <Modal show={true} loading={this.props.updating}>
        <div className="mb-2">
          <Label>Top up balance by ($)</Label>
          <Input
            className="pl-2"
            name="amount"
            type="number"
            placeholder="Amount - $"
            value={this.state.amount}
            onChange={this.updateField}
          />
        </div>
        <div className="d-flex justify-content-center mt-3">
          <Button className="mr-2" onClick={this.save}>
            Add to Balance
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
