import { getPersentOfConsumedWater } from '@/utils/waterInfoHelper';
import styles from './WaterProgressBar.module.scss';
import { useGetCurrentUserQuery } from '@/app/userApi';
import { useGetDaiLyWaterConsumptionQuery } from '@/app/waterApi';

const WaterProgressBar = () => {
  const { data: currentUser } = useGetCurrentUserQuery();
  const { data: dailyWaterConsumption } = useGetDaiLyWaterConsumptionQuery();

  const amount = dailyWaterConsumption?.reduce((prev, current) => prev + current.amount, 0);
  const percentage = currentUser && amount ? getPersentOfConsumedWater(currentUser.dailyWaterGoal, amount) : 0;

  return (
    <div className={styles['progress-container']}>
      <p className={styles['progress-title']}>Today</p>
      <div className={styles['progress-bar']}>
        <div className={styles['progress-fill']} style={{ width: `${percentage}%` }}></div>
        <div className={styles['progress-indicator']} style={{ left: `${percentage}%` }}>
          <span className={styles['progress-value']}>{percentage}%</span>
        </div>
      </div>
      <div className={styles['progress-labels']}>
        <span>0%</span>
        <span>100%</span>
      </div>
    </div>
  );
};

export default WaterProgressBar;
