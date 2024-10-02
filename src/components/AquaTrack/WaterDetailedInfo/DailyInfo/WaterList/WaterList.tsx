import { useGetDaiLyWaterConsumptionQuery } from '@/app/waterApi';
import WaterEntry from '../WaterEntry/WaterEntry';
import Typography from 'components/Shared/Typography/Typography';
import nowater from '@/assets/images/nowater.png';
import { selectedDate } from '@/features/date/dateSlice';
import { useAppSelector } from '@/app/hooks';

import styles from './WaterList.module.scss';

const WaterList = () => {
    const date = useAppSelector(selectedDate);
    const { data, error, isLoading } = useGetDaiLyWaterConsumptionQuery(date);

    return <div className={styles['scroll-container']}>
        <div className={styles['water-entries']}>
            {data?.length ? data.map(e => {
                return <WaterEntry key={e.id} amount={e.amount} time={e.time} id={e.id} />
            })
                :
                <>
                    <Typography component='p' weight='bold' size={18} className={styles['nowater-text']}>No water was consumed.</Typography>
                    <img alt='nowater' className={styles.nowater} src={nowater} />
                </>}
        </div>
    </div>

}

export default WaterList;