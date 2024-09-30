import WaterList from './WaterList/WaterList';

import styles from './DailyInfo.module.scss';
import Button from 'components/Shared/Button/Button';
import ReactModal from 'components/ReactModal/ReactModal';
import WaterModal from 'components/AquaTrack/WaterModal/WaterModal';
import { useState } from 'react';

const DailyInfo = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return <div className={styles['day-overview-wrapper']}>
        <div className={styles['day-overview']}>
            <span className={styles.today}>Today</span>
            <div>
                <ReactModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
                    <WaterModal onSubmitSuccess={() => setIsModalOpen(false)} />
                </ReactModal>
                <Button variant='iconWithText' onClick={() => setIsModalOpen(true)} icon='Plus'>Add water</Button>
            </div>
        </div>
        <WaterList />
    </div>
}

export default DailyInfo;