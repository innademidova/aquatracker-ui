import WaterConsumptionChart from "../WaterConsumptionChart/WaterConsumptionChart ";
import styles from "./Calendar.module.scss";
import { useGetCurrentUserQuery } from "@/app/api/userApi.ts";
import { useGetMonthlyWaterConsumptionQuery } from "@/app/api/waterApi.ts";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks.ts";
import { selectedDate, setSelectedDate } from "@/features/date/dateSlice";
import { getFullDate } from "@/shared/utils/dateHelper";
import { getPercentOfDailyConsumedWater } from "@/shared/utils/waterInfoHelper";
import cn from "classnames";
import Button from "components/Shared/Button/Button";
import Icon from "components/Shared/Icon/Icon";
import dayjs from "dayjs";
import { useState } from "react";

const Calendar = () => {
  const dispatch = useAppDispatch();
  const today = dayjs();
  const [currentDate, setCurrentDate] = useState(today);
  const selectedDateFromRedux = useAppSelector(selectedDate);
  const { data: currentUser } = useGetCurrentUserQuery();
  const { data: monthlyWaterConsumption } = useGetMonthlyWaterConsumptionQuery({
    year: currentDate.year(),
    month: currentDate.month() + 1,
  });
  const [isStatisticOpen, setIsStatisticOpen] = useState(false);

  const daysInMonth = currentDate.daysInMonth();

  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, "month"));
  };

  const handlePreviousMonth = () => {
    setCurrentDate(currentDate.subtract(1, "month"));
  };

  const renderDays = () => {
    const days = [];
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    return days;
  };

  const currentMonthName = currentDate.format("MMMM");
  const currentYear = currentDate.format("YYYY");

  return (
    <div className={styles.container}>
      <div className={styles["calendar-header"]}>
        <span className={styles["calendar-title"]}>
          {isStatisticOpen ? "Statictic" : "Month"}
        </span>
        <div className={styles["calendar-controls"]}>
          <div className={styles["month-navigation"]}>
            <button
              onClick={handlePreviousMonth}
              className={styles["navigation-button"]}
            >
              <Icon className={styles["icon"]} glyph={"ArrowLeft"} />
            </button>
            <span
              className={styles["current-month"]}
            >{`${currentMonthName}, ${currentYear}`}</span>
            <button
              onClick={handleNextMonth}
              className={styles["navigation-button"]}
            >
              <Icon className={styles["icon"]} glyph={"ArrowRight"} />
            </button>
          </div>
          <Button
            className={cn(styles["statistic-button"], {
              [styles["is-active"]]: isStatisticOpen,
            })}
            onClick={() => setIsStatisticOpen(!isStatisticOpen)}
            variant="icon"
            icon="Statistic"
          />
        </div>
      </div>
      {isStatisticOpen ? (
        <WaterConsumptionChart
          currentDate={currentDate}
          days={renderDays()}
          monthlyWaterConsumption={monthlyWaterConsumption}
        />
      ) : (
        <div className={styles["calendar-grid-wrapper"]}>
          <div className={styles["calendar-grid"]}>
            {renderDays().map((day) => {
              const fullDate = getFullDate(currentDate, day);
              const isSelected = fullDate === selectedDateFromRedux;
              const isFutureDate = dayjs(fullDate).isAfter(today, "day");
              const percentOfConsumedWater =
                (currentUser &&
                  getPercentOfDailyConsumedWater(
                    currentUser.dailyWaterGoal,
                    fullDate,
                    monthlyWaterConsumption
                  )) ||
                0;

              return (
                <div
                  key={day}
                  onClick={() =>
                    !isFutureDate && dispatch(setSelectedDate(fullDate))
                  }
                  className={cn(styles["day-wrapper"], {
                    [styles["disabled"]]: isFutureDate,
                  })}
                >
                  <div
                    className={cn(styles.day, {
                      [styles["insufficiently"]]: percentOfConsumedWater < 100,
                      [styles["isSelected"]]: isSelected,
                    })}
                  >
                    {day}
                  </div>
                  <span className={styles["day-progress"]}>
                    {percentOfConsumedWater}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
