import { useGetCurrentUserQuery } from '@/app/userApi';
import styles from './WaterDailyNorma.module.scss';
import Typography from 'components/Shared/Typography/Typography';

const WaterDailyNorma = () => {
    const { data: currentUser } = useGetCurrentUserQuery();
    return <div className={styles.wrapper}>
        <Typography component='span' weight='bold' lineHeight={23} size={15}>{currentUser?.dailyWaterGoal}L</Typography>
        <Typography component='span' color='secondary60' lineHeight={23}>My daily norma</Typography>
    </div>
}

export default WaterDailyNorma