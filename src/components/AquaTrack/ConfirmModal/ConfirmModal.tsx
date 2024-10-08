import styles from "./ConfirmModal.module.scss";
import Button from "components/Shared/Button/Button";

interface ConfirmModalProps {
  title: string;
  subtitle: string;
  onConfirm: () => void;
  confirmButtonText: string;
  onCancel: () => void;
}
const ConfirmModal: React.FC<ConfirmModalProps> = ({
  title,
  subtitle,
  onConfirm,
  confirmButtonText,
  onCancel,
}) => {
  return (
    <div className={styles.container}>
      <span className={styles.title}>{title}</span>
      <span className={styles.subtitle}>{subtitle}</span>
      <div className={styles.buttons}>
        <Button variant="primary" onClick={onConfirm}>
          {confirmButtonText}
        </Button>
        <Button variant="danger" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default ConfirmModal;
