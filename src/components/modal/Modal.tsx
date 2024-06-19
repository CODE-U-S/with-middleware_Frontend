import React from 'react';
import styled from 'styled-components';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isConfirm: boolean;
    message: string; // 각 모달마다 다른 메시지를 표시할 수 있도록 추가
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
    z-index: 1000;
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

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm, isConfirm, message }) => {
    if (!isOpen) return null;

    return (
        <ModalContainer>
            <ModalContent>
                <p>{message}</p>
                <ModalButtons>
                    <ModalButton onClick={onClose}>취소</ModalButton>
                    {!isConfirm && (
                        <ModalButton onClick={onConfirm}>확인</ModalButton>
                    )}
                </ModalButtons>
            </ModalContent>
        </ModalContainer>
    );
};

export default Modal;
