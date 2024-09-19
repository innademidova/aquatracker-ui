export const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();

export const getMonthName = (month: number, currentYear: number) => {
    const date = new Date(currentYear, month, 1);
    return date.toLocaleString('default', { month: 'long' });
  };