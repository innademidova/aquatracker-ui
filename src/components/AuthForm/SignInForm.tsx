import styles from "./AuthForm.module.scss";
import { signInValidationSchema } from "./validation/authValidation";
import { useLoginMutation } from "@/app/api/authApi.ts";
import { useGetCurrentUserQuery } from "@/app/api/userApi.ts";
import { ROUTES } from "@/shared/constants/routes";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "components/Shared/Button/Button";
import Input from "components/Shared/Input/Input";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface IFormInput {
    email: string;
    password: string;
}

const SignInForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormInput>({
        resolver: yupResolver(signInValidationSchema),
    });
    const [loginUser, { isLoading }] = useLoginMutation();
    const navigate = useNavigate();
    const { refetch } = useGetCurrentUserQuery();
    const [loginError, setLoginError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        try {
            const result = await loginUser(data).unwrap();
            if (result.accessToken) {
                refetch();
                navigate(ROUTES.TRACKER);
            } else {
                setLoginError("Login or password is incorrect");
            }
        } catch {
            setLoginError("Something went wrong");
        }
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    return (
        <div className={styles["container"]}>
            <div className={styles["form-wrapper"]}>
                <h2>Sign In</h2>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Input
                        {...register("email")}
                        type="email"
                        id="email"
                        name="email"
                        label="Email"
                        labelColor="secondary"
                        variant="bold"
                        placeholder="Enter your email"
                        autoComplete="email"
                        autoFocus
                        isError={errors.email}
                        errorMessage={errors.email?.message}
                    />
                    <Input
                        {...register("password")}
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        label="Password"
                        labelColor="secondary"
                        variant="bold"
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        isError={errors.password}
                        errorMessage={errors.password?.message}
                        iconEnd={showPassword ? "HidePassword" : "ShowPassword"}
                        onIconClick={handleClickShowPassword}
                    />
                    {loginError && <div className={styles['error-text']}>{loginError}</div>}
                    <Button
                        className={styles["submit-btn"]}
                        disabled={isLoading}
                        type="submit"
                        variant="primary"
                    >
                        {isLoading ? "Logging in..." : "Sign In"}
                    </Button>
                </form>
                <div className={styles["auth-helper"]}>
                    <p>
                        {`Don’t have an account? `}
                        <a onClick={() => navigate(ROUTES.SIGNUP)}>
                            <span>Sign Up</span>
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignInForm;
