import { useGetDaiLyWaterConsumptionQuery } from '@/app/waterApi';
import WaterEntry from '../WaterEntry/WaterEntry';
import Typography from 'components/Shared/Typography/Typography';
import { selectedDate } from '@/features/date/dateSlice';
import { useAppSelector } from '@/app/hooks';

import styles from './WaterList.module.scss';
import { Nowater } from '@/assets/images';

const WaterList = () => {
    const date = useAppSelector(selectedDate);
    const { data, error, isLoading } = useGetDaiLyWaterConsumptionQuery(date);

    return <div className={styles['scroll-container']}>
        <div className={styles['water-entries']}>
            {data?.length ? data.map(e => {
                return <WaterEntry key={e.id} amount={e.amount} time={e.loggedTime} id={e.id} />
            })
                :
                <>
                    <p className={styles['nowater-text']}>No water was consumed.</p>
                    <img alt='nowater' className={styles.nowater} src={Nowater} />
                </>}
        </div>
    </div>

}

export default WaterList;