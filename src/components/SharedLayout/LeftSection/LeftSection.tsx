import Logo from "../Logo/Logo";
import styles from "./LeftSection.module.scss";
import cn from "classnames";
import { FC, PropsWithChildren } from "react";

interface LeftSectionProps {
  className?: string;
  background?: "gray" | "green";
}

const LeftSection: FC<PropsWithChildren<LeftSectionProps>> = ({
  className,
  background = "gray",
  children,
}) => {
  return (
    <div
      className={cn(styles["left-section-container"], className, {
        [styles["background-green"]]: background === "green",
      })}
    >
      <Logo />
      {children}
    </div>
  );
};

export default LeftSection;
