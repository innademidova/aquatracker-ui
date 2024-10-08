import { useGetCurrentUserQuery } from '@/app/userApi';
import styles from './WaterDailyNorma.module.scss';

const WaterDailyNorma = () => {
    const { data: currentUser } = useGetCurrentUserQuery();
    return <div className={styles.wrapper}>
        <span className={styles.goal}>{currentUser?.dailyWaterGoal}L</span>
        <span className={styles.description}>My daily norma</span>
    </div>
}

export default WaterDailyNorma