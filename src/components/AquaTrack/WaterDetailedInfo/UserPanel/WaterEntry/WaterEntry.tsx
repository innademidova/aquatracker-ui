import Icon from '../../../../Icon/Icon';
import styles from './WaterEntry.module.scss';

const WaterEntry = () => {
    return <div className={styles.container}>
        <div className={styles.wrapper}>
            <Icon className={styles.glass} glyph='WaterGlass' />
            <div className={styles.details}>
                <div className={styles['water-amount']}>250 ml</div>
                <div className={styles.time}>7:00 AM</div>
            </div>
            <div className={styles['icon-buttons']}>
                <Icon className={styles.icon} glyph='Edit' />
                <Icon className={styles.icon} glyph='Trash' />
            </div>
        </div>
    </div>
}

export default WaterEntry;