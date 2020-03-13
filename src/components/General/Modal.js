import React, { Component } from 'react';
import styled, { keyframes, css } from 'styled-components';

const ModalContainer = styled.div`
  display: ${({ show }) => (show ? 'block' : 'none')};
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 5000;
`;

const modalShow = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const animation = css`
  animation: ${modalShow} 0.35s forwards;
`;

const ModalContent = styled.div`
  max-width: ${({ width }) => (width ? `${width}px` : '400px')};
  background: #f6f6f6;
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
  margin: 2rem auto;
  padding: 1rem;
  border-radius: 5px;
  transform: translateY(-100%);
  transition: transform 1s ease, opacity 0.5s ease;
  max-height: calc(100vh - 3rem);
  ${({ show }) => (show ? animation : 'animation: none;')};
  transform: ${({ show }) => (show ? 'translateY(0%)' : 'translateY(-100%)')};
  opacity: ${({ show, loading }) => {
    if (show && loading) return '0.4';
    return show ? '1' : '0';
  }};
`;

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = { modalShow: false };
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.show !== this.props.show) {
      this.toggleModal();
    }
  }

  toggleModal() {
    this.setState(prevState => ({ modalShow: !prevState.modalShow }));

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
    return (
      <ModalContainer show={this.props.show}>
        <ModalContent
          width={this.props.width}
          loading={this.props.loading}
          show={this.props.show}
        >
          {this.props.children}
        </ModalContent>
      </ModalContainer>
    );
  }
}

export default Modal;
