import { useGetDaiLyWaterConsumptionQuery } from '@/app/waterApi';
import WaterEntry from '../WaterEntry/WaterEntry';
import Typography from 'components/Shared/Typography/Typography';

import styles from './WaterList.module.scss';

const WaterList = () => {
    const { data, error, isLoading } = useGetDaiLyWaterConsumptionQuery();
    console.log(data);
    return <div className={styles['scroll-container']}>
        <div className={styles['water-entries']}>
            {data?.length ? data.map(e => {
                return <WaterEntry key={e.id} amount={e.amount} time={e.time} id={e.id} />
            })
                :
                <Typography component='p'>No water consumed today.</Typography>}
        </div>
    </div>

}

export default WaterList;