import WaterEntry from "../WaterEntry/WaterEntry";
import styles from "./WaterList.module.scss";
import { useGetDaiLyWaterConsumptionQuery } from "@/app/api/waterApi.ts";
import { useAppSelector } from "@/app/store/hooks.ts";
import { Nowater } from "@/assets/images";
import { selectedDate } from "@/features/date/dateSlice";

const WaterList = () => {
  const date = useAppSelector(selectedDate);
  const { data } = useGetDaiLyWaterConsumptionQuery(date);

  return (
    <div className={styles["scroll-container"]}>
      <div className={styles["water-entries"]}>
        {data?.length ? (
          data.map((e) => {
            return (
              <WaterEntry
                key={e.id}
                amount={e.amount}
                time={e.loggedTime}
                id={e.id}
              />
            );
          })
        ) : (
          <>
            <p className={styles["nowater-text"]}>No water was consumed.</p>
            <img alt="nowater" className={styles.nowater} src={Nowater} />
          </>
        )}
      </div>
    </div>
  );
};

export default WaterList;
