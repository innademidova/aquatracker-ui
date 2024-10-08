import styles from "./UserBarPopover.module.scss";
import Button from "components/Shared/Button/Button";
import { FC } from "react";

interface UserBarPopoverProps {
  setIsSettingsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsConfirmLogoutOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPopoverOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserBarPopover: FC<UserBarPopoverProps> = ({
  setIsConfirmLogoutOpen,
  setIsSettingsModalOpen,
  setIsPopoverOpen,
}) => {
  const onLogoutClick = () => {
    setIsConfirmLogoutOpen(true);
    setIsPopoverOpen(false);
  };

  const onSettingsClick = () => {
    setIsSettingsModalOpen(true);
    setIsPopoverOpen(false);
  };

  return (
    <div className={styles["popover-wrapper"]}>
      <Button variant="simple" icon="Settings" onClick={onSettingsClick}>
        Settings
      </Button>
      <Button onClick={onLogoutClick} variant="simple" icon="LogOut">
        Log out
      </Button>
    </div>
  );
};

export default UserBarPopover;
