import Calendar from "./Calendar/Calendar";
import DailyInfo from "./DailyInfo/DailyInfo";
import UserPanel from "./UserPanel/UserPanel";
import styles from "./WaterDetailedInfo.module.scss";

const WaterDetailedInfo = () => {
  return (
    <div className={styles.container}>
      <UserPanel />
      <DailyInfo />
      <Calendar />
    </div>
  );
};

export default WaterDetailedInfo;
