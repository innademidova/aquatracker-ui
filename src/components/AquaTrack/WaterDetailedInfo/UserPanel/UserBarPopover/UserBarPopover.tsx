import { useState } from "react";

import UserSettingsModal from "components/AquaTrack/UserSettingsModal/UserSettingsModal";
import ReactModal from "components/ReactModal/ReactModal";
import Button from "components/Shared/Button/Button";
import styles from './UserBarPopover.module.scss';
import ConfirmModal from "components/AquaTrack/ConfirmModal/ConfirmModal";
import { useLogoutMutation } from "@/app/authApi";
import { useNavigate } from "react-router-dom";

const UserBarPopover = () => {
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
    const [isConfirmLogoutOpen, setIsConfirmLogoutOpen] = useState(false);
    const navigate = useNavigate();

    const [logout] = useLogoutMutation();

    const onConfirmLogout = async () => {
        try {
            await logout();
            navigate('/');
        }
        catch (err) {
            console.log(err);
        }


    }

    return <div className={styles['popover-wrapper']}>
        <Button variant="simple" icon="Settings" onClick={() => setIsSettingsModalOpen(() => !isSettingsModalOpen)}>Settings</Button>
        <Button onClick={() => setIsConfirmLogoutOpen(true)} variant="simple" icon="LogOut">Log out</Button>
        <ReactModal isOpen={isSettingsModalOpen} onRequestClose={() => setIsSettingsModalOpen(false)}>
            <UserSettingsModal onSubmitSuccess={() => setIsSettingsModalOpen(false)} />
        </ReactModal>
        <ReactModal isOpen={isConfirmLogoutOpen} onRequestClose={() => setIsConfirmLogoutOpen(false)}>
            <ConfirmModal
                title="Log out"
                subtitle="Do you really want to leave?"
                confirmButtonText="Log out"
                onConfirm={onConfirmLogout}
                onCancel={() => setIsConfirmLogoutOpen(false)} />
        </ReactModal>
    </div>
}

export default UserBarPopover;