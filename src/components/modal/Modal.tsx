// Modal.tsx

import React from 'react';
import styled from 'styled-components';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const ModalButton = styled.button`
  margin-left: 1rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
`;

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <ModalContainer>
            <ModalContent>
                <p>정말로 삭제하시겠습니까?</p>
                <ModalButtons>
                    <ModalButton onClick={onClose}>취소</ModalButton>
                    <ModalButton onClick={onConfirm}>확인</ModalButton>
                </ModalButtons>
            </ModalContent>
        </ModalContainer>
    );
};

export default Modal;
