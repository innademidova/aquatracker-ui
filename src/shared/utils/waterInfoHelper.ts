import { WaterConsumptionResponse } from "@/app/api/waterApi.ts";

export const getPercentOfConsumedWater = (
  goal: number,
  dailyConsumption: number = 0
): number => {
  if (goal <= 0) {
    return 0;
  }

  return Math.min((dailyConsumption * 100) / (goal * 1000), 100);
};

export const getDailyConsumptionAmount = (
  date: string,
  monthlyConsumption: WaterConsumptionResponse[] = []
) => {
  return monthlyConsumption
    .filter((entry) => entry.date === date)
    .reduce((prev, cur) => prev + cur.amount, 0);
};

export const getDailyConsumptionInLiter = (
  date: string,
  monthlyConsumption: WaterConsumptionResponse[] = []
) => {
  const dailyConsumption = getDailyConsumptionAmount(date, monthlyConsumption);
  return Math.round(dailyConsumption * 0.001);
};

export const getPercentOfDailyConsumedWater = (
  goal: number,
  date: string,
  monthlyConsumption: WaterConsumptionResponse[] = []
) => {
  var dailyConsumption = getDailyConsumptionAmount(date, monthlyConsumption);
  return getPercentOfConsumedWater(goal, dailyConsumption);
};
