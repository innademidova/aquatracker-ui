import { ReactNode, useState } from 'react';
import Modal from 'react-modal';
import Icon from '../Icon/Icon';
import styles from './ReactModal.module.scss';

Modal.setAppElement('#root');

interface ModalProps {
    children: ReactNode;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReactModal: React.FC<ModalProps> = ({ children, isOpen, setIsOpen }) => {
    const closeModal = () => setIsOpen(false);

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            className={styles.modal}
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
                },

            }}
        >
            {children}
            <button className={styles['close-button']} onClick={closeModal}>
                <Icon glyph='Close' />
            </button>
        </Modal>
    );
};

export default ReactModal;
