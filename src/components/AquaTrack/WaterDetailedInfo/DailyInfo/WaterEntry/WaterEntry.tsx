import { FC } from 'react';

import { getCurrentTime } from '@/utils/dateHelper';
import { useDeleteWaterEntryMutation, useGetDaiLyWaterConsumptionQuery } from '@/app/waterApi';
import Button from 'components/Shared/Button/Button';
import Icon from '../../../../Icon/Icon';

import styles from './WaterEntry.module.scss';
import { selectedDate } from '@/features/date/dateSlice';
import { useAppSelector } from '@/app/hooks';

interface WaterEntryProps {
    id: number;
    amount: number;
    time: string;
}

const WaterEntry: FC<WaterEntryProps> = ({ amount, id, time }) => {
    const date = useAppSelector(selectedDate);
    const [deleteWaterEntry] = useDeleteWaterEntryMutation();
    const { refetch } = useGetDaiLyWaterConsumptionQuery(date);
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
                <Button variant='icon' icon="Edit" />
                <Button variant='icon' icon="Trash" onClick={deleteWaterEntryHandler} />
            </div>
        </div>
    </div>
}

export default WaterEntry;