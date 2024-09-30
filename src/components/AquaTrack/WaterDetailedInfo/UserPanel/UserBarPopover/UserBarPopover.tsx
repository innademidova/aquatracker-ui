import UserSettingsModal from "components/AquaTrack/UserSettingsModal/UserSettingsModal";
import ReactModal from "components/ReactModal/ReactModal";
import Button from "components/Shared/Button/Button";
import { useState } from "react";
import styles from './UserBarPopover.module.scss';

const UserBarPopover = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return <div className={styles['popover-wrapper']}>
        <Button variant="simple" icon="Settings" onClick={() => setIsModalOpen(() => !isModalOpen)}>Settings</Button>
        <Button variant="simple" icon="LogOut">Log out</Button>
        <ReactModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
            <UserSettingsModal onSubmitSuccess={() => setIsModalOpen(false)} />
        </ReactModal>
    </div>
}

export default UserBarPopover;