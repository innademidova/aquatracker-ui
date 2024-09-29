import { ReactNode } from 'react';
import Modal from 'react-modal';
import Icon from '../Icon/Icon';
import styles from './ReactModal.module.scss';

Modal.setAppElement('#root');

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onRequestClose: () => void;
}

const ReactModal: React.FC<ModalProps> = ({ children, isOpen, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles.modal}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
        },
      }}
    >
      {children}
      <button className={styles['close-button']} onClick={onRequestClose}>
        <Icon glyph='Close' />
      </button>
    </Modal>
  );
};

export default ReactModal;
