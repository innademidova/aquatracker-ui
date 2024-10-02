import { FC, ReactNode } from "react";

import styles from './SharedLayout.module.scss';
import Logo from "./Logo/Logo";

interface SharedLayoutProps {
    leftSection: ReactNode;
    rightSection: ReactNode;
}

const SharedLayout: FC<SharedLayoutProps> = ({ leftSection, rightSection }) => {
    const isTrackerPage = location.pathname === "/tracker";

    return <div className={styles.container}>
        <div className={`${styles['left-section']} ${isTrackerPage ? styles['tracker-bg'] : ''}`}>
            <Logo />
            {leftSection}
        </div>
        <div className={styles['right-section']}>{rightSection}</div>
    </div>



}

export default SharedLayout;