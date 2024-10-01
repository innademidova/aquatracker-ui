import React, { useState } from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

import { useLoginMutation } from '@/app/api';
import Input from 'components/Shared/Input/Input';
import Typography from 'components/Shared/Typography/Typography';
import Button from 'components/Shared/Button/Button';

import styles from './AuthForm.module.scss';

interface IFormInput {
    email: string;
    password: string;
    repeatPassword: string;
}

const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
    repeatPassword: Yup.string()
        .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
        .required('Repeat password is required')
});

const SignUpForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({
        resolver: yupResolver(validationSchema),
    });
    const [loginUser, { isLoading }] = useLoginMutation();
    const navigate = useNavigate();
    const [registerError, setRegisterError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        try {
            const result = await loginUser(data).unwrap();
            if (result.accessToken) {
                navigate('/');
            } else {
                setRegisterError('Login or password is incorrect');
            }
        } catch (err) {
            setRegisterError('Something went wrong');
        }
    };

    return (
        <div className={styles['container']}>
            <div className={styles['form-wrapper']}>
                <Typography component='h2' size={36} lineHeight={38} weight='bold'>Sign Up</Typography>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className={styles['form-group']}>
                        <Input
                            {...register('email')}
                            type="email"
                            id="email"
                            name="email"
                            label='Email'
                            labelColor='secondary'
                            variant='bold'
                            placeholder="Enter your email"
                            autoComplete="email"
                            autoFocus
                            isError={errors.email}
                            errorMessage={errors.email?.message}
                        />
                    </div>
                    <div className={styles['form-group']}>
                        <Input
                            {...register('password')}
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            label='Password'
                            labelColor='secondary'
                            variant='bold'
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            isError={errors.password}
                            errorMessage={errors.password?.message}
                            iconEnd={showPassword ? 'HidePassword' : 'ShowPassword'}
                            onIconClick={() => setShowPassword(show => !show)}
                        />
                    </div>
                    <div className={styles['form-group']}>
                        <Input
                            {...register('repeatPassword')}
                            type={showRepeatPassword ? 'text' : 'password'}
                            id="repeatPassword"
                            name="repeatPassword"
                            label='Repeat password'
                            labelColor='secondary'
                            variant='bold'
                            placeholder="Repeat your password"
                            autoComplete="current-password"
                            isError={errors.repeatPassword}
                            errorMessage={errors.repeatPassword?.message}
                            iconEnd={showRepeatPassword ? 'HidePassword' : 'ShowPassword'}
                            onIconClick={() => setShowRepeatPassword(show => !show)}
                        />
                    </div>
                    {/* {registerError && <div className={styles['error-text']}>{registerError}</div>} */}
                    <Button className={styles['submit-btn']} variant='primary' type="submit" disabled={isLoading}>
                        {isLoading ? 'Signing up in...' : 'Sign Up'}
                    </Button>
                </form>
                <div className={styles['auth-helper']}>
                    <Typography component='p' size={16} color='secondary50'>{`Already have an account? `}
                        <a onClick={() => navigate('/signin')}>
                            <Typography component='span' size={16} color='secondary' weight='bold'>Sign In</Typography>
                        </a>
                    </Typography>
                </div>
            </div>
        </div>
    );
};

export default SignUpForm;
