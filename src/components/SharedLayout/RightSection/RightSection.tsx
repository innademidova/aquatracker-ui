import styles from "./RightSection.module.scss";
import cn from "classnames";
import { FC, PropsWithChildren } from "react";

interface RightSectionProps {
  className?: string;
  isVisible?: boolean;
}

const RightSection: FC<PropsWithChildren<RightSectionProps>> = ({
  className,
  children,
  isVisible,
}) => {
  return (
    <div
      className={cn(styles["right-section-container"], className, {
        [styles["not-visible"]]: isVisible === false,
      })}
    >
      {children}
    </div>
  );
};

export default RightSection;
