import { useState } from 'react';

import Icon from 'components/Icon/Icon';
import UserBarPopover from '../UserBarPopover/UserBarPopover';
import { useGetCurrentUserQuery } from '@/app/userApi';
import { getCurrentUserName } from '@/utils/textFormatter';

import styles from './UserBar.module.scss';
import { ProfilePfoto } from '@/assets/images';

const UserBar = () => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const { data: currentUser } = useGetCurrentUserQuery();

    return <div className={styles['profile-button-wrapper']}>
        <div onClick={() => setIsPopoverOpen(() => !isPopoverOpen)} className={styles['profile-button']}>
            <span>{currentUser && getCurrentUserName(currentUser)}</span>
            <img alt="avatar" src={ProfilePfoto} />
            <Icon className={styles.icon} glyph='ArrowDown' />
        </div>
        {isPopoverOpen && <UserBarPopover />}
    </div>
}

export default UserBar;