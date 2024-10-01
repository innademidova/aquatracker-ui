import { WaterConsumptionResponse } from "@/app/waterApi";

export const getPercentOfConsumedWater = (goal: number, dailyConsumption: number = 0): number => {
    if (goal <= 0) {
        return 0;
    }

    return Math.min((dailyConsumption * 100) / (goal * 1000), 100);
};

export const getPercentOfMonthlyConsumedWater = (goal: number, date: string, monthlyConsumption: WaterConsumptionResponse[] = []) => {
    var dailyConsumption = monthlyConsumption.filter(entry => entry.date === date).reduce((prev, cur) => prev + cur.amount, 0);
    return getPercentOfConsumedWater(goal, dailyConsumption);
}