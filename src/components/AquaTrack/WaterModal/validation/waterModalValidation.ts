import * as Yup from "yup";

export const addWaterValidationSchema = Yup.object().shape({
  time: Yup.string().required("Time is required"),
  amount: Yup.number().required("Amount is required"),
});

export const editWaterEntryValidationSchema = Yup.object().shape({
  amount: Yup.number().required("Amount is required"),
});
