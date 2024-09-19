import Icon from '../../Icon/Icon';
import Button from '../../Shared/Button/Button';
import Input from '../../Shared/Input/Input';
import Typography from '../../Shared/Typography/Typography';
import styles from './ProfileModal.module.scss';
import avatar from '../../../assets/images/user-photo.png';

const ProfileModal = () => {
    return <div className={styles['profile-modal']}>
        <header className={styles['modal-header']}>
            <Typography component='h3'>Setting</Typography>
        </header>
        <form className={styles['settings-form']}>
            <div className={styles['profile-photo']}>
                <input type="file" id="photo-upload" className={styles['photo-upload-input']} />
                <label htmlFor="photo-upload" className={styles['photo-upload-label']}>
                    <img src={avatar} alt="Profile photo" className={styles['profile-image']} />
                    <div className={styles['upload-btn']}>
                        <Icon glyph='Upload' />
                        <Typography color='secondary' component='p'>Upload a photo</Typography>
                    </div>
                </label>
            </div>
            <div className={styles['fieldset']}>
                <Typography component='h4'>Your gender identity</Typography>
                <div className={styles['radio-group']}>
                    <label htmlFor="gender-woman">
                        <input type="radio" id="gender-woman" name="gender" value="woman" checked /> Woman
                    </label>
                    <label htmlFor="gender-man">
                        <input type="radio" id="gender-man" name="gender" value="man" /> Man
                    </label>
                </div>
            </div>
            <div className={styles['form-parts']}>
                <div className={styles['form-part']}>
                    <Input
                        label='Your name'
                        variant='bold'
                        type="text"
                        id="name"
                        name="name"
                        value="Nadia"
                    />
                    <Input
                        label='Email'
                        variant='bold'
                        type="email"
                        id="email"
                        name="email"
                        value="nadia10@gmail.com" />


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
                        label='Your weight in kilograms:'
                        id="weight"
                        name="weight"
                        labelColor='secondary'
                        value="0" />

                    <Input
                        label='The time of active participation in sports:'
                        type="number"
                        id="active-time"
                        name="active-time"
                        labelColor='secondary'
                        value="0" />
                    <div className={styles['form-group']}>
                        <Typography component='p'>The required amount of water in liters per day:</Typography>
                        <span className={styles['result']}>1.8 L</span>
                    </div>

                    <Input
                        label='Write down how much water you will drink:'
                        variant='bold'
                        id="water-input"
                        name="water-input"
                        value="1.8" />
                </div>
            </div>
            <Button variant='primary' type="submit">Save</Button>
        </form>
    </div>
}

export default ProfileModal;