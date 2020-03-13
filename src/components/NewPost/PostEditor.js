import React, { Component } from 'react';
import styled from 'styled-components';
import AnswerInput from '../PostPage/AnswerInput';
import Editor from '../PostPage/Editor/Editor';
import Colors from '../styles/Colors';

const Container = styled.div`
  background: #ffffff;
`;

const InputContainer = styled.div`
  margin-bottom: 0.5em;
`;

const Label = styled.div`
  font-weight: 600;
  font-size: 1em;
`;

const Input = styled.input`
  padding: 4px 5px;
  border: 1px solid rgba(34, 34, 34, 0.2);
  border-radius: 4px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
`;

const Value = styled.span`
  color: ${Colors.red};
  font-weight: 600;
`;

class PostEditor extends Component {
  constructor(props) {
    super(props);
    this.updateField = this.updateField.bind(this);
  }

  updateField(evt) {
    const { name, value } = evt.target;
    this.props.updateComposeField(name, value);
  }

  render() {
    const { title, value, description, user } = this.props;

    return (
      <Container>
        <InputContainer>
          <Label>Title</Label>
          <Input
            name="title"
            type="text"
            value={title}
            onChange={this.updateField}
          />
        </InputContainer>

        <InputContainer>
          <Label>Description</Label>
          <Editor
            onChange={htmlState =>
              this.props.updateComposeField('description', htmlState)
            }
          />
        </InputContainer>

        <InputContainer>
          <div className="d-flex align-items-center mb-2">
            <Label>Bounty - USD </Label>
            <div className="ml-2" style={{ fontSize: '14px' }}>
              (Current Balance:{' '}
              <Value>${user.balance >= 0 ? user.balance.toFixed(2) : 0}</Value>)
            </div>
          </div>
          <Input
            name="value"
            type="number"
            value={value}
            max="4.5"
            onChange={this.updateField}
            style={{ width: '120px' }}
          />
        </InputContainer>
      </Container>
    );
  }
}

export default PostEditor;
