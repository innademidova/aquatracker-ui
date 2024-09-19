import React from 'react';
import styles from './WaterModal.module.scss';
import Button from '../../Shared/Button/Button';
import Input from '../../Shared/Input/Input';

interface WaterModalProps {
    isEditing?: boolean;
}

const WaterModal: React.FC<WaterModalProps> = ({ isEditing = false }) => {
    return <div className={styles.container}>
        <span className={styles.title}>
            {isEditing ? 'Edit the entered amount of water'
                : 'Add water'}
        </span>
        <span className={styles.subtitle}>
            {isEditing ? 'Correct entered data:'
                : 'Choose a value:'}
        </span>
        <div>
            <span className={styles.label}>Amount of water:</span>
            <div className={styles['add-water-buttons']}>
                <Button icon='Minus' className={styles['icon-btn']} variant='outlined'/>
                <div className={styles.amount}>250 ml</div>
                <Button icon="Plus" className={styles['icon-btn']} variant='outlined'/>
            </div>
        </div>
        <div>
            <span className={styles.label}>Recording time:</span><br />
            <Input className={styles.input} />
        </div>
        <div>
            <span className={styles.subtitle}>Enter the value of the water used:</span><br />
            <Input className={styles.input} />
        </div>
        <Button variant='primary' className={styles['save-button']}>Save</Button>
    </div>
}

export default WaterModal;