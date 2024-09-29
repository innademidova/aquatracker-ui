import React, { useState } from 'react';
import styles from './WaterModal.module.scss';
import Button from '../../Shared/Button/Button';
import Input from '../../Shared/Input/Input';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useAddWaterMutation, useGetDaiLyWaterConsumptionQuery } from '@/app/waterApi';
import { getCurrentTime } from '@/utils/timeHelper';
import dayjs from 'dayjs';

interface WaterModalProps {
    isEditing?: boolean;
    onSubmitSuccess: () => void;
}

interface IFormInput {
    time: string;
    amount: number;
}

const validationSchema = Yup.object().shape({
    time: Yup.string().required('Time is required'),
    amount: Yup.number().required('Amount is required'),
});

const WaterModal: React.FC<WaterModalProps> = ({ isEditing = false, onSubmitSuccess }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({
        resolver: yupResolver(validationSchema),
    });
    const [amount, setAmount] = useState(50);
    const [addWater] = useAddWaterMutation();
    const { refetch } = useGetDaiLyWaterConsumptionQuery();

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        try {
            console.log('data', data);
            await addWater({
                amount: data.amount,
                date: dayjs().format('YYYY-MM-DD'),
                time: data.time
            }).unwrap();
            refetch();
            onSubmitSuccess();
        } catch (err) {
            console.error('Something went wrong', err);
        }
    };

    const handleIncrease = () => {
        setAmount((prev) => prev + 50);
    };

    const handleDecrease = () => {
        if (amount > 50) {
            setAmount((prev) => prev - 50);
        }
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(Number(e.target.value));
    };

    return (
        <div className={styles.container}>
            <span className={styles.title}>
                {isEditing ? 'Edit the entered amount of water' : 'Add water'}
            </span>
            <span className={styles.subtitle}>
                {isEditing ? 'Correct entered data:' : 'Choose a value:'}
            </span>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <span className={styles.label}>Amount of water:</span>
                    <div className={styles['add-water-buttons']}>
                        <Button type="button" onClick={handleDecrease} icon="Minus" className={styles['icon-btn']} variant="outlined" />
                        <div className={styles.amount}>{amount || 0} ml</div>
                        <Button type="button" onClick={handleIncrease} icon="Plus" className={styles['icon-btn']} variant="outlined" />
                    </div>
                </div>
                <div className={styles['form-items']}>
                    <Input
                        {...register('time')}
                        id="time"
                        name="time"
                        defaultValue={getCurrentTime()}
                        autoFocus
                        isError={errors.time}
                        errorMessage={errors.time?.message}
                        label="Recording time:"
                        labelColor="secondary"
                    />
                    <Input
                        {...register('amount')}
                        id="amount"
                        name="amount"
                        type="number"
                        min={50}
                        value={amount}
                        onChange={handleAmountChange}
                        autoFocus
                        isError={errors.amount}
                        errorMessage={errors.amount?.message}
                        variant="bold"
                        label="Enter the value of the water used:"
                    />
                    <Button type="submit" variant="primary" className={styles['save-button']}>
                        Save
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default WaterModal;
