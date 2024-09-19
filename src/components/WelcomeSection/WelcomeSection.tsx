import { useNavigate } from 'react-router-dom';
import styles from './WelcomeSection.module.scss';
import Button from '../Shared/Button/Button';
import Typography from '../Shared/Typography/Typography';

const WelcomeSection = () => {
    const navigate = useNavigate();
    return <div className={styles.wrapper}>
        <Typography component='p' color='secondary'>
            Record daily water intake and track
        </Typography>
        <Typography component='h1'>Water consumption tracker</Typography>
        <div className={styles["cta-buttons"]}>
            <Button onClick={() => navigate('/signup')} variant='primary'>Try tracker</Button>
            <Button onClick={() => navigate('/signin')} variant='outlined'>Sign In</Button>
        </div>
    </div>
}

export default WelcomeSection;