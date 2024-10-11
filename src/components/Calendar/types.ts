type TCalendarEventType = {
    id: number;
    name: string;
    color: string; // hex (with #) or mui pallete supported (e.g. primary.light)
};

type TCalendarEvent = {
    id: number;
    title: string;
    type: TCalendarEventType;
    location: string; // ?
    startDate: Date; // day-time
    endDate: Date; // day-time
    withIds: number[];
};

export type { TCalendarEvent, TCalendarEventType };
