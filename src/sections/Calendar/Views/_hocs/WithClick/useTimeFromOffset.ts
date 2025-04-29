import {
    CELL_HOUR_HEIGHT,
    START_HOUR,
    TOTAL_HOURS,
} from "@/constants/calendar";
import { useCallback, MouseEvent } from "react";

interface HourMinureRes {
    hour: number;
    minute: number;
}

const getTimeFromOffset = (offsetY: number): HourMinureRes => {
    // Calculate total minutes from midnight based on pixel position
    const totalMinutes =
        Math.floor((offsetY / CELL_HOUR_HEIGHT) * 60) + START_HOUR * 60;

    // Extract hours and minutes
    const hour = Math.floor(totalMinutes / 60);
    const minute = totalMinutes % 60;

    // Ensure we stay within bounds
    if (hour >= START_HOUR + TOTAL_HOURS) {
        return {
            hour: START_HOUR + TOTAL_HOURS - 1,
            minute: 59,
        };
    }
    if (hour < START_HOUR) {
        return {
            hour: START_HOUR,
            minute: 0,
        };
    }

    return { hour, minute };
};

const useTimeFromOffset = (
    date: Date,
    callback: (e: MouseEvent<HTMLDivElement>, date: string) => void
) => {
    const onClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
        // Get the target element and its bounding rectangle
        const element = e.currentTarget;
        const rect = element.getBoundingClientRect();

        // Calculate relative Y position from click
        const relativeY = e.clientY - rect.top + element.scrollTop;

        // Get time from offset
        const res = getTimeFromOffset(relativeY);

        date.setHours(res.hour);
        date.setMinutes(res.minute);

        callback(e, date.toISOString());
    }, []);

    return { onClick };
};

export default useTimeFromOffset;
