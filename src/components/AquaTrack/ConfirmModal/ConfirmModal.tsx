import styles from './ConfirmModal.module.scss';

interface ConfirmModalProps {
    title: string;
    subtitle: string;
    onConfirm?: () => void;
    confirmButtonText: string;
}
const ConfirmModal: React.FC<ConfirmModalProps> = ({title, subtitle, onConfirm, confirmButtonText}) => {
    return <div className={styles.container}>
        <span className={styles.title}>{title}</span>
        <span className={styles.subtitle}>{subtitle}</span>
        <div className={styles.buttons}>
            <button className={styles['confirm-button']}>{confirmButtonText}</button>
            <button className={styles['cancel-button']}>Cancel</button>
        </div>
    </div>
}

export default ConfirmModal;