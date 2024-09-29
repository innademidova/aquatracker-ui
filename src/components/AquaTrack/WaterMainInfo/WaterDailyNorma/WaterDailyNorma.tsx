import { useGetCurrentUserQuery } from '@/app/userApi';
import styles from './WaterDailyNorma.module.scss';

const WaterDailyNorma = () => {
    const { data: currentUser } = useGetCurrentUserQuery();
    return <div className={styles.wrapper}>
        <p className={styles.amount}>{currentUser?.dailyWaterGoal}L</p>
        <p className={styles.text}>My daily norma</p>
    </div>
}

export default WaterDailyNorma