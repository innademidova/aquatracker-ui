import UserBar from './UserBar/UserBar';
import { useGetCurrentUserQuery } from '@/app/userApi';
import { getCurrentUserName } from '@/utils/textFormatter';

import styles from './UserPanel.module.scss';

const UserPanel = () => {
    const { data: currentUser } = useGetCurrentUserQuery();

    return <div className={styles.container}>
        <div className={styles['user-header']}>
            <div className={styles.hello}>Hello, <span> {currentUser && getCurrentUserName(currentUser!)}!</span></div>
            <UserBar />
        </div>

    </div>
}

export default UserPanel;