import * as Yup from "yup";

export const userSettingsValidationSchema = Yup.object().shape({
    name: Yup.string()
        .required("Name is required")
        .min(2, "Name must be at least 2 characters"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    weight: Yup.number()
        .positive("Weight must be positive")
        .integer("Weight must be an integer"),
    activeTime: Yup.number()
        .min(0, "Active time must be 0 or more")
        .integer("Active time must be an integer"),
    dailyWaterGoal: Yup.number()
        .positive("Water input must be positive")
        .required("required"),
});