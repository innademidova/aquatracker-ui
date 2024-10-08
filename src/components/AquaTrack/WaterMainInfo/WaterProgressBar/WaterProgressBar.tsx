import { getPercentOfConsumedWater } from '@/utils/waterInfoHelper';
import styles from './WaterProgressBar.module.scss';
import { useGetCurrentUserQuery } from '@/app/userApi';
import { useGetDaiLyWaterConsumptionQuery } from '@/app/waterApi';
import { useAppSelector } from '@/app/hooks';
import { selectedDate } from '@/features/date/dateSlice';
import { getFormattedSelectedDate } from '@/utils/dateHelper';
import cn from 'classnames';

const WaterProgressBar = () => {
  const date = useAppSelector(selectedDate);
  const { data: currentUser } = useGetCurrentUserQuery();
  const { data: dailyWaterConsumption } = useGetDaiLyWaterConsumptionQuery(date);

  const amount = dailyWaterConsumption?.reduce((prev, current) => prev + current.amount, 0);
  const percentage = currentUser && amount ? getPercentOfConsumedWater(currentUser.dailyWaterGoal, amount) : 0;

  return (
    <div className={styles['progress-container']}>
      <span className={styles.day}>{getFormattedSelectedDate(date)}</span>
      <div className={styles['progress-bar']}>
        <div className={styles['progress-fill']} style={{ width: `${percentage || 0}%` }}></div>
        <div className={styles['progress-indicator']} style={{ left: `${percentage}%` }}>
          {percentage > 0 && <span className={styles['progress-value']}>{percentage}%</span>}
        </div>
      </div>
      <div className={cn(styles['progress-labels'], {
        [styles['not-visible']]: percentage !== 0
      })}>
        <span>0%</span>
        <span>100%</span>
      </div>
    </div>
  );
};

export default WaterProgressBar;
