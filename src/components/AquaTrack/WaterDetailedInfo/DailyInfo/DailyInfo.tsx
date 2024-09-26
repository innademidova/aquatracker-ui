import Icon from 'components/Icon/Icon';
import styles from './DailyInfo.module.scss';
import WaterList from './WaterList/WaterList';

const DailyInfo = () => {
    return <div className={styles['day-overview-wrapper']}>
        <div className={styles['day-overview']}>
            <span className={styles.today}>Today</span>
            <div className={styles['add-water']}>
                <button className={styles['add-water-button']}><Icon glyph='Plus' /></button>
                <span className={styles.text}>Add water</span>
            </div>
        </div>
        <WaterList />
    </div>
}

export default DailyInfo;