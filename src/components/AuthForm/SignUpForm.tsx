import styles from "./AuthForm.module.scss";
import { signUpValidationSchema } from "./validation/authValidation";
import { useRegisterMutation } from "@/app/api/authApi.ts";
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
    repeatPassword: string;
}

const SignUpForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormInput>({
        resolver: yupResolver(signUpValidationSchema),
    });
    const [registerUser, { isLoading }] = useRegisterMutation();
    const navigate = useNavigate();
    const [registerError, setRegisterError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        try {
            await registerUser(data).unwrap();
            navigate(ROUTES.SIGNIN);
        } catch {
            setRegisterError("Something went wrong");
        }
    };

    return (
        <div className={styles["container"]}>
            <div className={styles["form-wrapper"]}>
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className={styles["form-group"]}>
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
                    </div>
                    <div className={styles["form-group"]}>
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
                            onIconClick={() => setShowPassword((show) => !show)}
                        />
                    </div>
                    <div className={styles["form-group"]}>
                        <Input
                            {...register("repeatPassword")}
                            type={showRepeatPassword ? "text" : "password"}
                            id="repeatPassword"
                            name="repeatPassword"
                            label="Repeat password"
                            labelColor="secondary"
                            variant="bold"
                            placeholder="Repeat your password"
                            autoComplete="current-password"
                            isError={errors.repeatPassword}
                            errorMessage={errors.repeatPassword?.message}
                            iconEnd={showRepeatPassword ? "HidePassword" : "ShowPassword"}
                            onIconClick={() => setShowRepeatPassword((show) => !show)}
                        />
                    </div>
                    {registerError && <div className={styles['error-text']}>{registerError}</div>}
                    <Button
                        className={styles["submit-btn"]}
                        variant="primary"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? "Signing up in..." : "Sign Up"}
                    </Button>
                </form>
                <div className={styles["auth-helper"]}>
                    <p>
                        {`Already have an account? `}
                        <a onClick={() => navigate(ROUTES.SIGNIN)}>
                            <span>Sign In</span>
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUpForm;
