import Icon from 'components/Icon/Icon';
import styles from './DailyInfo.module.scss';
import WaterEntry from '../UserPanel/WaterEntry/WaterEntry';

const DailyInfo = () => {
return <div>
            <div className={styles['day-overview']}>
            <span className={styles.today}>Today</span>
            <div className={styles['add-water']}>
                <button className={styles['add-water-button']}><Icon glyph='Plus' /></button>
                <span className={styles.text}>Add water</span>
            </div>
        </div>
        <div className={styles['water-entries']}>
            <WaterEntry />
        </div>
        <div></div>
</div>
}

export default DailyInfo;