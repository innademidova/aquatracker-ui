import Typography from 'components/Shared/Typography/Typography';
import styles from './AdvantagesSection.module.scss';
import cn from 'classnames';
import { Background, Customer1, Customer2, Customer3 } from '@/assets/images';


const AdvantagesSection = () => {
    const customers = [Customer1, Customer2, Customer3]
    return <div className={styles.container}>
        <img alt="backgroung" src={Background} />
        <div className={cn(styles.details, styles.customers)}>
            <div className={styles['avatar-group']}>
                {customers.map(el => {
                    return <img alt='customer-pfoto' src={el} key={el} className={styles.avatar} />
                })}
            </div>
            <Typography component='span' size={15} lineHeight={23} weight='bold'>Our <Typography component='span' size={15} lineHeight={23} weight='bold' color='green'>happy</Typography> customers</Typography>
        </div>
        <div className={cn(styles.details, styles['habit-drive'])}><div className={styles.adornment}></div><Typography component='span' weight='bold' lineHeight={12} color="white">Habit drive</Typography></div>
        <div className={cn(styles.details, styles['view-statistics'])}><Typography component='span' weight='bold' lineHeight={12} color="primary">View statistics</Typography></div>
        <div className={cn(styles.details, styles['rate-setting'])}><Typography component='span' weight='bold' lineHeight={12} color="primary">Personal rate setting</Typography></div>
    </div>
}

export default AdvantagesSection;