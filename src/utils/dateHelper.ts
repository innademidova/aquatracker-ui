import dayjs from "dayjs";

export const getCurrentTime = () => {
    return dayjs().format('HH:mm');
};

export const getFormattedSelectedDate = (dateString: string) => {
    const today = dayjs();
    const date = dayjs(dateString);
    const isToday = date.isSame(today, 'day');
    return isToday ? 'Today' : date.format('DD, MMMM');
}