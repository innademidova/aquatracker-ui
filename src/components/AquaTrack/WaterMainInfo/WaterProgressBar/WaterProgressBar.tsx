import { getPercentOfConsumedWater } from '@/utils/waterInfoHelper';
import styles from './WaterProgressBar.module.scss';
import { useGetCurrentUserQuery } from '@/app/userApi';
import { useGetDaiLyWaterConsumptionQuery } from '@/app/waterApi';
import { useAppSelector } from '@/app/hooks';
import { selectedDate } from '@/features/date/dateSlice';
import { getFormattedSelectedDate } from '@/utils/dateHelper';
import Typography from 'components/Shared/Typography/Typography';

const WaterProgressBar = () => {
  const date = useAppSelector(selectedDate);
  const { data: currentUser } = useGetCurrentUserQuery();
  const { data: dailyWaterConsumption } = useGetDaiLyWaterConsumptionQuery(date);

  const amount = dailyWaterConsumption?.reduce((prev, current) => prev + current.amount, 0);
  const percentage = currentUser && amount ? getPercentOfConsumedWater(currentUser.dailyWaterGoal, amount) : 0;

  return (
    <div className={styles['progress-container']}>
      <Typography component='span' weight='bold' size={15} lineHeight={23}>{getFormattedSelectedDate(date)}</Typography>
      <div className={styles['progress-bar']}>
        <div className={styles['progress-fill']} style={{ width: `${percentage || 0}%` }}></div>
        <div className={styles['progress-indicator']} style={{ left: `${percentage}%` }}>
          {percentage > 0 && <Typography component='span' size={12} lineHeight={23} color='green' className={styles['progress-value']}>{percentage}%</Typography>}
        </div>
      </div>
      {!percentage && <div className={styles['progress-labels']}>
        <Typography component='span' lineHeight={23} color='secondary60'>0%</Typography>
        <Typography component='span' lineHeight={23} color='secondary60'>100%</Typography>
      </div>}
    </div>
  );
};

export default WaterProgressBar;
