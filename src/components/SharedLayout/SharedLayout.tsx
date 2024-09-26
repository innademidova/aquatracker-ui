import { FC } from "react";
import { useLocation } from "react-router-dom";

import styles from './SharedLayout.module.scss';
import Logo from "./Logo/Logo";

interface SharedLayoutProps {
    leftSection: React.ReactNode;
    rightSection: React.ReactNode;
}

const SharedLayout: FC<SharedLayoutProps> = ({ leftSection, rightSection }) => {
    const location = useLocation();

    const getBackgroundColor = () => {
        if (location.pathname === "/tracker") {
            return "#9BE1A0";
        } else {
            return "#F0EFF4";
        }
    };
    return <div className={styles.container}>
        <div className={styles['left-section']} style={{ backgroundColor: getBackgroundColor() }}>
            <Logo />
            {leftSection}
        </div>
        <div className={styles['right-section']}>{rightSection}</div>
    </div>



}

export default SharedLayout;