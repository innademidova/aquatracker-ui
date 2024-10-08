import LeftSection from "./LeftSection/LeftSection";
import RightSection from "./RightSection/RightSection";
import styles from "./SharedLayout.module.scss";
import cn from "classnames";
import { FC, PropsWithChildren } from "react";

interface SharedLayoutProps {
  className?: string;
}

interface SharedLayoutExtensions {
  LeftSection: typeof LeftSection;
  RightSection: typeof RightSection;
}

const SharedLayout: FC<PropsWithChildren<SharedLayoutProps>> &
  SharedLayoutExtensions = ({ className, children }) => {
  return (
    <div className={cn(styles["layout-container"], className)}>{children}</div>
  );
};

SharedLayout.LeftSection = LeftSection;
SharedLayout.RightSection = RightSection;

export default SharedLayout;
