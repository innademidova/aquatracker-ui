import UserSettingsModal from "components/AquaTrack/UserSettingsModal/UserSettingsModal";
import ReactModal from "components/ReactModal/ReactModal";
import Button from "components/Shared/Button/Button";
import { useState } from "react";
import styles from './UserBarPopover.module.scss';

const UserBarPopover = () => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    return <div className={styles['popover-wrapper']}>
        <Button variant="simple" icon="Settings" onClick={() => setIsSettingsOpen(() => !isSettingsOpen)}>Settings</Button>
        <Button variant="simple" icon="LogOut">Log out</Button>
        {isSettingsOpen && <ReactModal isOpen={isSettingsOpen} setIsOpen={setIsSettingsOpen}>
            <UserSettingsModal />
        </ReactModal>}
    </div>
}

export default UserBarPopover;