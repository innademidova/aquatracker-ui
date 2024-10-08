import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Icon from '../../Icon/Icon';
import Button from '../../Shared/Button/Button';
import Input from '../../Shared/Input/Input';

import styles from './UserSettingsModal.module.scss';
import { useGetCurrentUserQuery, useUpdateProfileMutation } from '@/app/userApi';
import { Customer1 } from '@/assets/images';

interface UserSettingsFormData {
    name: string;
    email: string;
    gender?: 'Woman' | 'Man';
    dailyWaterGoal: number;
    weight?: number;
    activeTime?: number;
}

interface UserSettingsModalProps {
    onSubmitSuccess: () => void;
}

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
    email: Yup.string().required('Email is required').email('Email is invalid'),
    weight: Yup.number().positive('Weight must be positive').integer('Weight must be an integer'),
    activeTime: Yup.number().min(0, 'Active time must be 0 or more').integer('Active time must be an integer'),
    dailyWaterGoal: Yup.number().positive('Water input must be positive').required('required')
});

const UserSettingsModal: React.FC<UserSettingsModalProps> = ({ onSubmitSuccess }) => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<UserSettingsFormData>({
        resolver: yupResolver(validationSchema)
    });

    const { data: currentUser } = useGetCurrentUserQuery();
    const [updateProfile] = useUpdateProfileMutation();

    const onSubmit: SubmitHandler<UserSettingsFormData> = async (data) => {
        console.log("data", data)
        try {
            await updateProfile(data).unwrap();
            onSubmitSuccess();
        }
        catch (err) {
            console.log(err);
        }
    };

    return (
        <div className={styles['profile-modal']}>
            <h3 className={styles.title}>Settings</h3>
            <form onSubmit={handleSubmit(onSubmit)} className={styles['settings-form']}>
                <div className={styles['profile-photo']}>
                    <input type="file" id="photo-upload" className={styles['photo-upload-input']} />
                    <label htmlFor="photo-upload" className={styles['photo-upload-label']}>
                        <img src={Customer1} alt="Profile photo" className={styles['profile-image']} />
                        <div className={styles['upload-btn']}>
                            <Icon glyph="Upload" />
                            <p>
                                Upload a photo
                            </p>
                        </div>
                    </label>
                </div>
                <div className={styles['fieldset']}>
                    <p className={styles.label}>Your gender identity</p>
                    <div className={styles['radio-group']}>
                        <label htmlFor="gender-woman">
                            <input
                                checked={currentUser?.gender == 'Woman'}
                                type="radio"
                                id="gender-woman"
                                value="Woman"
                                {...register('gender')}
                            />{' '}
                            Woman
                        </label>
                        <label htmlFor="gender-man">
                            <input
                                checked={currentUser?.gender == 'Man'}
                                type="radio"
                                id="gender-man"
                                value="Man"
                                {...register('gender')}
                            />{' '}
                            Man
                        </label>
                        {errors.gender && <p>{errors.gender.message}</p>}
                    </div>
                </div>
                <div className={styles['form-parts']}>
                    <div className={styles['form-part']}>
                        <Input
                            label="Your name"
                            variant="bold"
                            type="text"
                            id="name"
                            defaultValue={currentUser?.name}
                            {...register('name')}
                            errorMessage={errors.name?.message}
                        />
                        <Input
                            label="Email"
                            variant="bold"
                            type="email"
                            id="email"
                            defaultValue={currentUser?.email}
                            {...register('email')}
                            errorMessage={errors.email?.message}
                        />
                        <div className={styles['daily-norma']}>
                            <p className={styles.label}>My daily norma</p>
                            <div className={styles['norma-details']}>
                                <div className={styles['formula-section']}>
                                    <div className={styles['norma-item']}>
                                        <p>For woman:</p>
                                        <span className={styles.formula}>V=(M*0.03) + (T*0.4)</span>
                                    </div>
                                    <div className={styles['norma-item']}>
                                        <p>For man:</p>
                                        <span className={styles.formula}>V=(M*0.04) + (T*0.6)</span>
                                    </div>
                                </div>
                                <div className={styles['formula-details']}>
                                    <p>
                                        <span className={styles.asterisk}>*</span> V is the volume of the water norm in liters per day, M is your body weight, T is the time of active sports or other types of activities commensurate with loads (in the absence of these, you must set 0).
                                    </p>
                                </div>
                                <div className={styles['additional-info']}>
                                    <Icon glyph='ExclamationMark' />
                                    <p>Active time in hours</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles['form-part']}>
                        <Input
                            label="Your weight in kilograms:"
                            id="weight"
                            defaultValue={currentUser?.weight}
                            {...register('weight')}
                            labelColor="secondary"
                            errorMessage={errors.weight?.message}
                        />

                        <Input
                            label="The time of active participation in sports:"
                            type="number"
                            id="active-time"
                            defaultValue={currentUser?.activeTime}
                            {...register('activeTime')}
                            labelColor="secondary"
                            errorMessage={errors.activeTime?.message}
                        />
                        <div className={styles['form-group']}>
                            <p>The required amount of water in liters per day:</p>
                            <span className={styles['result']}>1.8 L</span>
                        </div>

                        <Input
                            label="Write down how much water you will drink:"
                            variant="bold"
                            type='number'
                            id="water-input"
                            defaultValue={currentUser?.dailyWaterGoal}
                            {...register('dailyWaterGoal')}
                            errorMessage={errors.dailyWaterGoal?.message}
                        />
                    </div>
                </div>

                <Button variant="primary" type="submit">
                    Save
                </Button>
            </form>
        </div>
    );
};

export default UserSettingsModal;
