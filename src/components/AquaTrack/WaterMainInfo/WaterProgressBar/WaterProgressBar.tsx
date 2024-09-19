import styles from './WaterProgressBar.module.scss';

const WaterProgressBar = () => {
  return (
    <div className={styles['progress-container']}>
      <p className={styles['progress-title']}>Today</p>
      <div className={styles['progress-bar']}>
        <div className={styles['progress-fill']} style={{ width: '50%' }}></div>
        <div className={styles['progress-indicator']}></div>
      </div>
      <div className={styles['progress-labels']}>
        <span>0%</span>
        <span>50%</span>
        <span>100%</span>
      </div>
    </div>
  );
};

export default WaterProgressBar;
