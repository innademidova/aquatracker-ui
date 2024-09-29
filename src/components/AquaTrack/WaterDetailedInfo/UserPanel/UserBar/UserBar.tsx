import Icon from 'components/Icon/Icon';
import styles from './UserBar.module.scss';
import { useState } from 'react';
import avatar from '@/assets/images/user-photo.png';
import UserBarPopover from '../UserBarPopover/UserBarPopover';
import { useGetCurrentUserQuery } from '@/app/userApi';
import { getCurrentUserName } from '@/utils/textFormatter';

const UserBar = () => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const { data: currentUser } = useGetCurrentUserQuery();

    return <div>
        <div onClick={() => setIsPopoverOpen(() => !isPopoverOpen)} className={styles['profile-button']}>
            <span>{currentUser && getCurrentUserName(currentUser)}</span>
            <img alt="avatar" src={avatar} />
            <Icon className={styles.icon} glyph='ArrowDown' />
        </div>
        {isPopoverOpen && <UserBarPopover />}
    </div>
}

export default UserBar;