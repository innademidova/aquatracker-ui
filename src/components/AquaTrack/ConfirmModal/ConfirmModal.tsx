import Button from 'components/Shared/Button/Button';
import styles from './ConfirmModal.module.scss';
import Typography from 'components/Shared/Typography/Typography';

interface ConfirmModalProps {
    title: string;
    subtitle: string;
    onConfirm: () => void;
    confirmButtonText: string;
    onCancel: () => void;
}
const ConfirmModal: React.FC<ConfirmModalProps> = ({ title, subtitle, onConfirm, confirmButtonText, onCancel }) => {
    return <div className={styles.container}>
        <Typography component='span' size={28} lineHeight={32} weight='bold'>{title}</Typography>
        <Typography component='span' size={18}>{subtitle}</Typography>
        <div className={styles.buttons}>
            <Button variant='primary' onClick={onConfirm}>{confirmButtonText}</Button>
            <Button variant='danger' onClick={onCancel}>Cancel</Button>
        </div>
    </div>
}

export default ConfirmModal;