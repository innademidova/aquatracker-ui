import styles from './UserPanel.module.scss';
import avatar from '../../../../assets/images/user-photo.png';
import Icon from '../../../Icon/Icon';
import { useState } from 'react';
import ReactModal from '../../../ReactModal/ReactModal';
import ProfileModal from '../../ProfileModal/ProfileModal';

const UserPanel = () => {
    const [isOpen, setIsOpen] = useState(false);

    return <div className={styles.container}>
        <div className={styles['user-header']}>
            <div className={styles.hello}>Hello, <span> Nadia!</span></div>
            <div onClick={() => setIsOpen(true)} className={styles['profile-button']}>
                <span>Nadia</span>
                <img alt="avatar" src={avatar} />
                <Icon className={styles.icon} glyph='ArrowDown' />
            </div>
        </div>
        <ReactModal isOpen={isOpen} setIsOpen={setIsOpen}>
            <ProfileModal/>
        </ReactModal>
    </div>
}

export default UserPanel;