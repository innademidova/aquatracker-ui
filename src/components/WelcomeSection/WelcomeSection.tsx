import { useNavigate } from 'react-router-dom';
import styles from './WelcomeSection.module.scss';
import Button from '../Shared/Button/Button';

const WelcomeSection = () => {
    const navigate = useNavigate();

    return <div className={styles['welcome-container']}>
        <div className={styles.wrapper}>
            <p className={styles.subtitle}>
                Record daily water intake and track
            </p>
            <h1 className={styles.title}>Water consumption tracker</h1>
            <div className={styles["cta-buttons"]}>
                <Button onClick={() => navigate('/signup')} variant='primary'>Try tracker</Button>
                <Button onClick={() => navigate('/signin')} variant='outlined'>Sign In</Button>
            </div>
        </div>
    </div>
}

export default WelcomeSection;