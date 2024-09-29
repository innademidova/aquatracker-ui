export const getPersentOfConsumedWater = (goal: number, dailyConsumption: number) => {
    return dailyConsumption * 100 / (goal * 1000);
}