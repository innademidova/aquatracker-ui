import UserBarPopover from "../UserBarPopover/UserBarPopover";
import styles from "./UserBar.module.scss";
import { useLogoutMutation } from "@/app/api/authApi.ts";
import { useGetCurrentUserQuery } from "@/app/api/userApi.ts";
import { ProfilePfoto } from "@/assets/images";
import { ROUTES } from "@/shared/constants/routes";
import { getCurrentUserName } from "@/shared/utils/textFormatter";
import ConfirmModal from "components/AquaTrack/ConfirmModal/ConfirmModal";
import UserSettingsModal from "components/AquaTrack/UserSettingsModal/UserSettingsModal";
import ReactModal from "components/ReactModal/ReactModal";
import Icon from "components/Shared/Icon/Icon";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserBar = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isConfirmLogoutOpen, setIsConfirmLogoutOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const navigate = useNavigate();

  const [logout] = useLogoutMutation();
  const { data: currentUser } = useGetCurrentUserQuery();

  const onConfirmLogout = async () => {
    try {
      await logout();
      navigate(ROUTES.HOME);
    } catch (err) {
      console.log(err);
    }
  };

  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsPopoverOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popoverRef]);

  return (
    <>
      <div className={styles["profile-button-wrapper"]} ref={popoverRef}>
        <div
          onClick={() => setIsPopoverOpen((prev) => !prev)}
          className={styles["profile-button"]}
        >
          <span>{currentUser && getCurrentUserName(currentUser)}</span>
          <img alt="avatar" src={ProfilePfoto} />
          <Icon className={styles.icon} glyph="ArrowDown" />
        </div>
        {isPopoverOpen && (
          <UserBarPopover
            setIsPopoverOpen={setIsPopoverOpen}
            setIsConfirmLogoutOpen={setIsConfirmLogoutOpen}
            setIsSettingsModalOpen={setIsSettingsModalOpen}
          />
        )}
      </div>
      <ReactModal
        isOpen={isSettingsModalOpen}
        onRequestClose={() => setIsSettingsModalOpen(false)}
      >
        <UserSettingsModal
          onSubmitSuccess={() => setIsSettingsModalOpen(false)}
        />
      </ReactModal>
      <ReactModal
        isOpen={isConfirmLogoutOpen}
        onRequestClose={() => setIsConfirmLogoutOpen(false)}
      >
        <ConfirmModal
          title="Log out"
          subtitle="Do you really want to leave?"
          confirmButtonText="Log out"
          onConfirm={onConfirmLogout}
          onCancel={() => setIsConfirmLogoutOpen(false)}
        />
      </ReactModal>
    </>
  );
};

export default UserBar;
