import { FC, InputHTMLAttributes, forwardRef } from "react";
import styles from './Input.module.scss';
import { FieldError } from "react-hook-form";
import * as Icons from '../../../assets/icons';
import Icon from "../../Icon/Icon";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    isError?: FieldError;
    errorMessage?: string;
    iconStart?: keyof typeof Icons;
    iconEnd?: keyof typeof Icons;
    onIconClick?: () => void;
    label?: string;
    variant?: 'bold' | 'regular';
    labelColor?: 'primary' | 'secondary';
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
    isError,
    errorMessage,
    iconStart,
    iconEnd,
    onIconClick,
    label,
    id,
    variant = 'regular',
    labelColor = 'primary',
    ...props
}, ref) => {
    const inputClass = `
        ${styles.input}     
        ${isError ? styles['input--error'] : ''} 
    `;

    
    const labelClass = `
    ${styles.label}     
    ${styles[`label--${variant}`]}
    ${styles[`label--${labelColor}`]} 
`;

    return (
        <div className={styles['input-wrapper']}>
            {label && <label className={labelClass} htmlFor={id}>{label}</label>}
            {iconStart && (
                <button
                    type="button"
                    className={styles['icon-button']}
                    onClick={onIconClick}
                >
                    <Icon className={styles['input-icon']} glyph={iconStart} />
                </button>
            )}
            <div className={styles['input-item']}>
                <input ref={ref} id={id} className={inputClass} {...props} />

                {iconEnd && (
                    <button
                        type="button"
                        className={styles['icon-button']}
                        onClick={onIconClick}
                    >
                        <Icon className={styles['input-icon']} glyph={iconEnd} />
                    </button>
                )}
            </div>
            {isError && <span className={styles['error-text']}>{errorMessage}</span>}
        </div>
    );
});

export default Input;
