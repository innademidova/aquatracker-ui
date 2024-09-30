import { getPersentOfConsumedWater } from '@/utils/waterInfoHelper';
import styles from './WaterProgressBar.module.scss';
import { useGetCurrentUserQuery } from '@/app/userApi';
import { useGetDaiLyWaterConsumptionQuery } from '@/app/waterApi';
import { useAppSelector } from '@/app/hooks';
import { selectedDate } from '@/features/date/dateSlice';
import { getFormattedSelectedDate } from '@/utils/dateHelper';

const WaterProgressBar = () => {
  const date = useAppSelector(selectedDate);
  const { data: currentUser } = useGetCurrentUserQuery();
  const { data: dailyWaterConsumption } = useGetDaiLyWaterConsumptionQuery(date);

  const amount = dailyWaterConsumption?.reduce((prev, current) => prev + current.amount, 0);
  const percentage = currentUser && amount ? getPersentOfConsumedWater(currentUser.dailyWaterGoal, amount) : '';

  return (
    <div className={styles['progress-container']}>
      <p className={styles['progress-title']}>{getFormattedSelectedDate(date)}</p>
      <div className={styles['progress-bar']}>
        <div className={styles['progress-fill']} style={{ width: `${percentage || 0}%` }}></div>
        <div className={styles['progress-indicator']} style={{ left: `${percentage}%` }}>
          {percentage && <span className={styles['progress-value']}>{percentage}%</span>}
        </div>
      </div>
      {!percentage && <div className={styles['progress-labels']}>
        <span>0%</span>
        <span>100%</span>
      </div>}
    </div>
  );
};

export default WaterProgressBar;
