import { FC } from 'react';

import { getCurrentTime } from '@/utils/timeHelper';
import { useDeleteWaterEntryMutation, useGetDaiLyWaterConsumptionQuery } from '@/app/waterApi';
import Button from 'components/Shared/Button/Button';
import Icon from '../../../../Icon/Icon';

import styles from './WaterEntry.module.scss';

interface WaterEntryProps {
    id: number;
    amount: number;
    time: string;
}

const WaterEntry: FC<WaterEntryProps> = ({ amount, id, time }) => {
    const [deleteWaterEntry] = useDeleteWaterEntryMutation();
    const { refetch } = useGetDaiLyWaterConsumptionQuery();
    const deleteWaterEntryHandler = async () => {
        try {
            await deleteWaterEntry(id).unwrap();
            refetch();
        }
        catch (err) {
            console.error('Something went wrong', err);
        }
    }
    return <div className={styles.container}>
        <div className={styles.wrapper}>
            <Icon className={styles.glass} glyph='WaterGlass' />
            <div className={styles.details}>
                <div className={styles['water-amount']}>{amount} ml</div>
                <div className={styles.time}>{getCurrentTime()}</div>
            </div>
            <div className={styles['icon-buttons']}>
                <Button variant='simple' icon="Edit" />
                <Button variant='simple' icon="Trash" onClick={deleteWaterEntryHandler} />
            </div>
        </div>
    </div>
}

export default WaterEntry;