import { useState } from 'react';
import dayjs from 'dayjs';
import Icon from '../../../Icon/Icon';
import styles from './Calendar.module.scss';
import { useAppDispatch } from '@/app/hooks';
import { setSelectedDate } from '@/features/date/dateSlice';

const Calendar = () => {
    const dispatch = useAppDispatch();
    const today = dayjs();
    const [currentDate, setCurrentDate] = useState(today);

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
                    return (
                        <div onClick={() => dispatch(setSelectedDate(fullDate))} className={styles['day-wrapper']} key={day}>
                            <div className={styles.day}>{day}</div>
                            <div className={styles['day-progress']}>100%</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Calendar;
