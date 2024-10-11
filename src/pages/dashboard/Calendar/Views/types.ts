type TCalendarEvent = {
    id: number;
    title: string;
    location: string; // ?
    startDate: Date; // day-time
    endDate: Date; // day-time
    withIds: number[];
};

export type { TCalendarEvent };
