import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import styles from './Button.module.scss';
import Icon from "../../Icon/Icon";
import * as Icons from '../../../assets/icons';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant: 'primary' | 'secondary' | 'outlined' | 'simple' | 'danger' | 'icon' | 'iconWithText';
    children?: ReactNode;
    className?: string;
    icon?: keyof typeof Icons;
}

const Button: FC<ButtonProps> = ({ variant, children, className = '', icon, ...props }) => {
    const buttonClass = `
        ${styles.btn} 
        ${styles[`btn--${variant}`]} 
        ${className}
      `;

    return <button className={buttonClass} {...props}>
        {icon && <Icon glyph={icon} />}
        {children && <span className={styles['btn-text']}>{children}</span>}
    </button>
}

export default Button;