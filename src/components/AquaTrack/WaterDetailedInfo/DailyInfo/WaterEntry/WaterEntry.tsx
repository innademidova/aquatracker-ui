import styles from "./WaterEntry.module.scss";
import {
  useDeleteWaterEntryMutation,
  useGetDaiLyWaterConsumptionQuery,
} from "@/app/api/waterApi.ts";
import { useAppSelector } from "@/app/store/hooks.ts";
import { selectedDate } from "@/features/date/dateSlice";
import { formatTime } from "@/shared/utils/dateHelper";
import ConfirmModal from "components/AquaTrack/ConfirmModal/ConfirmModal";
import WaterModal from "components/AquaTrack/WaterModal/WaterModal";
import ReactModal from "components/ReactModal/ReactModal";
import Button from "components/Shared/Button/Button";
import Icon from "components/Shared/Icon/Icon";
import { FC, useState } from "react";

interface WaterEntryProps {
  id: number;
  amount: number;
  time: string;
}

const WaterEntry: FC<WaterEntryProps> = ({ amount, id, time }) => {
  const date = useAppSelector(selectedDate);
  const [deleteWaterEntry] = useDeleteWaterEntryMutation();
  const { refetch } = useGetDaiLyWaterConsumptionQuery(date);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isWaterModalOpen, setIsWaterModalOpen] = useState(false);
  const deleteWaterEntryHandler = async () => {
    try {
      await deleteWaterEntry(id).unwrap();
      refetch();
    } catch (err) {
      console.error("Something went wrong", err);
    }
  };
  console.log(time);
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Icon className={styles.glass} glyph="WaterGlass" />
        <div className={styles.details}>
          <div className={styles["water-amount"]}>{amount} ml</div>
          <div className={styles.time}>{formatTime(time)}</div>
        </div>
        <div className={styles["icon-buttons"]}>
          <Button
            variant="icon"
            icon="Edit"
            onClick={() => setIsWaterModalOpen(true)}
          />
          <Button
            variant="icon"
            icon="Trash"
            onClick={() => setIsConfirmModalOpen(true)}
          />
        </div>
      </div>
      {isWaterModalOpen && (
        <ReactModal
          isOpen={isWaterModalOpen}
          onRequestClose={() => setIsWaterModalOpen(false)}
        >
          <WaterModal
            isEditing={true}
            entryId={id}
            entryAmount={amount}
            loggedTime={formatTime(time)}
            onSubmitSuccess={() => setIsWaterModalOpen(false)}
          />
        </ReactModal>
      )}
      {isConfirmModalOpen && (
        <ReactModal
          isOpen={isConfirmModalOpen}
          onRequestClose={() => setIsConfirmModalOpen(false)}
        >
          <ConfirmModal
            title="Delete entry"
            subtitle="Are you sure you want to delete the entry?"
            confirmButtonText="Delete"
            onConfirm={deleteWaterEntryHandler}
            onCancel={() => setIsConfirmModalOpen(false)}
          />
        </ReactModal>
      )}
    </div>
  );
};

export default WaterEntry;
