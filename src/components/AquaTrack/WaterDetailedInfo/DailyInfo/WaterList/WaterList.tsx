import styles from './WaterList.module.scss';

import { useGetDaiLyWaterConsumptionQuery } from '@/app/waterApi';
import WaterEntry from '../../UserPanel/WaterEntry/WaterEntry';

const WaterList = () => {
    const { data, error, isLoading } = useGetDaiLyWaterConsumptionQuery();
    return <div className={styles['scroll-container']}>
        <div className={styles['water-entries']}>
            {data?.map(e => {
                return <WaterEntry key={e.id} amount={e.amount} time={e.time} id={e.id} />
            })}
        </div>
    </div>

}

export default WaterList;