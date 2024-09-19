import { useState } from 'react';
import Icon from '../../../Icon/Icon';
import styles from './Calendar.module.scss';
import { getDaysInMonth, getMonthName } from '../../../../utils/calendarHelper';

const Calendar = () => {
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);

    const handleNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    const handlePreviousMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const renderDays = () => {
        const days = [];
        for (let day = 1; day <= daysInMonth; day++) {
            days.push(day);
        }
        return days;
    };

    const currentMonthName = getMonthName(currentMonth, currentYear);

    return <div className={styles.container}>
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
                <button className={styles['statistic-button']}>
                    <Icon className={styles['icon']} glyph={'Statistic'} />
                </button>
            </div>
        </div>
        <div className={styles['calendar-grid']}>
            {renderDays().map((day) => {
                return (
                    <div className={styles['day-wrapper']} key={day}>
                        <div className={styles.day}>{day}</div>
                        <div className={styles['day-progress']}>100%</div>
                    </div>
                );
            })}
        </div>
    </div>
}

export default Calendar;