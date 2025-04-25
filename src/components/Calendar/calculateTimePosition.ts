import { CELL_HOUR_HEIGHT, START_HOUR } from "@/constants/calendar";

const calculateTimePosition = (startDate: string, endDate: string) => {
    const startHour = new Date(startDate).getHours();
    const startMinutes = new Date(startDate).getMinutes();
    const endHour = new Date(endDate).getHours();
    const endMinutes = new Date(endDate).getMinutes();

    const top = (startHour - START_HOUR + startMinutes / 60) * CELL_HOUR_HEIGHT;
    const height =
        (endHour - startHour + (endMinutes - startMinutes) / 60) *
        CELL_HOUR_HEIGHT;

    return {
        top,
        height,
    };
};

export default calculateTimePosition;
