import styles from "./AdvantagesSection.module.scss";
import { Background, Customer1, Customer2, Customer3 } from "@/assets/images";
import cn from "classnames";

const AdvantagesSection = () => {
  const customers = [Customer1, Customer2, Customer3];
  return (
    <div className={styles.container}>
      <img alt="backgroung" src={Background} className={styles.background} />
      <div className={cn(styles.details, styles.customers)}>
        <div className={styles["avatar-group"]}>
          {customers.map((el) => {
            return (
              <img
                alt="customer-pfoto"
                src={el}
                key={el}
                className={styles.avatar}
              />
            );
          })}
        </div>
        <span>
          Our <span className={styles.happy}>happy</span> customers
        </span>
      </div>
      <div className={styles.benefits}>
        <div>
          <div className={cn(styles.details, styles["habit-drive"])}>
            <div className={styles.adornment}></div>
            <span>Habit drive</span>
          </div>
          <div className={cn(styles.details, styles["view-statistics"])}>
            <span>View statistics</span>
          </div>
        </div>
        <div className={cn(styles.details, styles["rate-setting"])}>
          <span>Personal rate setting</span>
        </div>
      </div>
    </div>
  );
};

export default AdvantagesSection;
