import styles from "./DailyInfo.module.scss";
import WaterList from "./WaterList/WaterList";
import { useAppSelector } from "@/app/store/hooks.ts";
import { selectedDate } from "@/features/date/dateSlice";
import { getFormattedSelectedDate } from "@/shared/utils/dateHelper";
import WaterModal from "components/AquaTrack/WaterModal/WaterModal";
import ReactModal from "components/ReactModal/ReactModal";
import Button from "components/Shared/Button/Button";
import { useState } from "react";

const DailyInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const date = useAppSelector(selectedDate);

  return (
    <div className={styles["day-overview-wrapper"]}>
      <div className={styles["day-overview"]}>
        <span className={styles.today}>{getFormattedSelectedDate(date)}</span>
        <div>
          <ReactModal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
          >
            <WaterModal onSubmitSuccess={() => setIsModalOpen(false)} />
          </ReactModal>
          <Button
            variant="iconWithText"
            onClick={() => setIsModalOpen(true)}
            icon="Plus"
          >
            Add water
          </Button>
        </div>
      </div>
      <WaterList />
    </div>
  );
};

export default DailyInfo;
