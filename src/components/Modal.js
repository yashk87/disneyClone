import React from 'react';
import styled from 'styled-components';

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  z-index: 1000;
`;

const CloseButton = styled.button`
  /* Add your close button styles */
`;

const Modal = ({ onClose }) => {
  return (
    <ModalWrapper>
      <h2>Your Modal Content Goes Here</h2>
      <CloseButton onClick={onClose}>Close</CloseButton>
    </ModalWrapper>
  );
};

export default Modal;