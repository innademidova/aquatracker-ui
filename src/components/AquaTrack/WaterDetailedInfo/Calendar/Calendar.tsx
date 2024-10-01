import { useState } from 'react';
import dayjs from 'dayjs';
import Icon from '../../../Icon/Icon';
import styles from './Calendar.module.scss';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectedDate, setSelectedDate } from '@/features/date/dateSlice';
import { useGetCurrentUserQuery } from '@/app/userApi';
import { useGetMonthlyWaterConsumptionQuery } from '@/app/waterApi';
import { getPercentOfMonthlyConsumedWater } from '@/utils/waterInfoHelper';
import Typography from 'components/Shared/Typography/Typography';

const Calendar = () => {
    const dispatch = useAppDispatch();
    const today = dayjs();
    const [currentDate, setCurrentDate] = useState(today);
    const selectedDateFromRedux = useAppSelector(selectedDate);
    const { data: currentUser } = useGetCurrentUserQuery();
    const { data: monthlyWaterConsumption } = useGetMonthlyWaterConsumptionQuery({ year: currentDate.year(), month: currentDate.month() + 1 });

    const daysInMonth = currentDate.daysInMonth();

    const handleNextMonth = () => {
        setCurrentDate(currentDate.add(1, 'month'));
    };

    const handlePreviousMonth = () => {
        setCurrentDate(currentDate.subtract(1, 'month'));
    };

    const renderDays = () => {
        const days = [];
        for (let day = 1; day <= daysInMonth; day++) {
            days.push(day);
        }
        return days;
    };

    const currentMonthName = currentDate.format('MMMM');
    const currentYear = currentDate.format('YYYY');

    return (
        <div className={styles.container}>
            <div className={styles['calendar-header']}>
                <span className={styles['calendar-title']}>Month</span>
                <div className={styles['calendar-controls']}>
                    <div className={styles['month-navigation']}>
                        <button onClick={handlePreviousMonth} className={styles['navigation-button']}>
                            <Icon className={styles['icon']} glyph={'ArrowLeft'} />
                        </button>
                        <span className={styles['current-month']}>{`${currentMonthName}, ${currentYear}`}</span>
                        <button onClick={handleNextMonth} className={styles['navigation-button']}>
                            <Icon className={styles['icon']} glyph={'ArrowRight'} />
                        </button>
                    </div>
                </div>
            </div>
            <div className={styles['calendar-grid']}>
                {renderDays().map((day) => {
                    const fullDate = currentDate.date(day).format('YYYY-MM-DD');
                    const isSelected = fullDate === selectedDateFromRedux;
                    const percentOfConsumedWater = currentUser && getPercentOfMonthlyConsumedWater(currentUser.dailyWaterGoal, fullDate, monthlyWaterConsumption) || 0;
                    return (
                        <div onClick={() => dispatch(setSelectedDate(fullDate))} className={styles['day-wrapper']} key={day}>
                            <div className={`${styles.day} ${percentOfConsumedWater < 100 ? styles['insufficiently'] : ''} ${isSelected ? styles['isSelected'] : ''}`}>{day}</div>
                            <Typography component='span' align='center' color='secondary60' lineHeight={23}>{percentOfConsumedWater}%</Typography>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Calendar;
