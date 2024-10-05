import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Icon from '../../Icon/Icon';
import Button from '../../Shared/Button/Button';
import Input from '../../Shared/Input/Input';
import Typography from '../../Shared/Typography/Typography';

import styles from './UserSettingsModal.module.scss';
import { useGetCurrentUserQuery, useUpdateProfileMutation } from '@/app/userApi';
import { ProfilePfoto } from '@/assets/images';

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
            <header className={styles['modal-header']}>
                <Typography component="h3">Setting</Typography>
            </header>
            <form onSubmit={handleSubmit(onSubmit)} className={styles['settings-form']}>
                <div className={styles['profile-photo']}>
                    <input type="file" id="photo-upload" className={styles['photo-upload-input']} />
                    <label htmlFor="photo-upload" className={styles['photo-upload-label']}>
                        <img src={ProfilePfoto} alt="Profile photo" className={styles['profile-image']} />
                        <div className={styles['upload-btn']}>
                            <Icon glyph="Upload" />
                            <Typography color="secondary" component="p">
                                Upload a photo
                            </Typography>
                        </div>
                    </label>
                </div>
                <div className={styles['fieldset']}>
                    <Typography component="h4">Your gender identity</Typography>
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
                            <Typography component='h4'>My daily norma</Typography>
                            <div className={styles['norma-details']}>
                                <div className={styles['norma-item']}>
                                    <Typography component='p'>For woman:</Typography>
                                    <Typography color='green' component='span'>V=(M*0.03) + (T*0.4)</Typography>
                                </div>
                                <div className={styles['norma-item']}>
                                    <Typography component='p'>For man:</Typography>
                                    <Typography color='green' component='span'>V=(M*0.04) + (T*0.6)</Typography>
                                </div>
                                <div className={styles['formula-details']}>
                                    <Typography component='p' >
                                        <Typography weight='regular' color='green' component='span'>*</Typography> V is the volume of the water norm in liters per day, M is your body weight, T is the time of active sports or other types of activities commensurate with loads (in the absence of these, you must set 0).
                                    </Typography>
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
                            <Typography component="p">The required amount of water in liters per day:</Typography>
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
