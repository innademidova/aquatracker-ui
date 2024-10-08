import Button from "../../Shared/Button/Button";
import Input from "../../Shared/Input/Input";
import styles from "./WaterModal.module.scss";
import {
  addWaterValidationSchema,
  editWaterEntryValidationSchema,
} from "./validation/waterModalValidation";
import {
  useAddWaterMutation,
  useGetDaiLyWaterConsumptionQuery,
  useUpdateWaterEntryMutation,
} from "@/app/api/waterApi.ts";
import { useAppSelector } from "@/app/store/hooks.ts";
import { selectedDate } from "@/features/date/dateSlice";
import { getCurrentTime } from "@/shared/utils/dateHelper";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface WaterModalProps {
  isEditing?: boolean;
  loggedTime?: string;
  entryId?: number;
  entryAmount?: number;
  onSubmitSuccess: () => void;
}

interface IFormInput {
  time?: string;
  amount: number;
}

const WaterModal: React.FC<WaterModalProps> = ({
  isEditing = false,
  onSubmitSuccess,
  loggedTime,
  entryId,
  entryAmount,
}) => {
  const date = useAppSelector(selectedDate);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(
      isEditing ? addWaterValidationSchema : editWaterEntryValidationSchema
    ),
  });
  const [amount, setAmount] = useState(entryAmount || 50);
  const [addWater] = useAddWaterMutation();
  const [updateWaterEntry] = useUpdateWaterEntryMutation();
  const { refetch } = useGetDaiLyWaterConsumptionQuery(date);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      if (isEditing) {
        var test = { id: entryId!, amount };
        console.log(test);
        await updateWaterEntry({ id: entryId!, amount }).unwrap();
      } else {
        await addWater({
          amount,
          date,
          time: data.time!,
        }).unwrap();
      }
      refetch();
      onSubmitSuccess();
    } catch (err) {
      console.error("Something went wrong", err);
    }
  };

  const handleIncrease = () => {
    setAmount((prev) => prev + 50);
  };

  const handleDecrease = () => {
    if (amount > 50) {
      setAmount((prev) => prev - 50);
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        {isEditing ? "Edit the entered amount of water" : "Add water"}
      </h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <span className={styles.subtitle}>
            {isEditing ? "Correct entered data:" : "Choose a value:"}
          </span>
          <div>
            <p>Amount of water:</p>
            <div className={styles["add-water-buttons"]}>
              <Button
                type="button"
                onClick={handleDecrease}
                icon="Minus"
                className={styles["icon-btn"]}
                variant="outlined"
              />
              <div className={styles.amount}>
                <span>{amount} ml</span>
              </div>
              <Button
                type="button"
                onClick={handleIncrease}
                icon="Plus"
                className={styles["icon-btn"]}
                variant="outlined"
              />
            </div>
          </div>
          <Input
            {...register("time")}
            id="time"
            name="time"
            defaultValue={isEditing ? loggedTime : getCurrentTime()}
            disabled={isEditing}
            autoFocus
            isError={errors.time}
            errorMessage={errors.time?.message}
            label="Recording time:"
            labelColor="secondary"
          />
        </div>
        <Input
          {...register("amount")}
          id="amount"
          name="amount"
          type="number"
          min={50}
          value={amount}
          onChange={handleAmountChange}
          autoFocus
          isError={errors.amount}
          errorMessage={errors.amount?.message}
          variant="bold"
          label="Enter the value of the water used:"
        />
        <Button
          type="submit"
          variant="primary"
          className={styles["save-button"]}
        >
          Save
        </Button>
      </form>
    </div>
  );
};

export default WaterModal;
