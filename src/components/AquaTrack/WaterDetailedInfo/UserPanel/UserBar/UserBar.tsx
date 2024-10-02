import { useState } from 'react';

import Icon from 'components/Icon/Icon';
import avatar from '@/assets/images/user-photo.png';
import UserBarPopover from '../UserBarPopover/UserBarPopover';
import { useGetCurrentUserQuery } from '@/app/userApi';
import { getCurrentUserName } from '@/utils/textFormatter';

import styles from './UserBar.module.scss';

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