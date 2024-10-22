import { TCalendarEvent } from "../types";

const isSameDay = (date1: Date, date2: Date) =>
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate();

const _getTodaysEvents = (events: TCalendarEvent[], date: Date) =>
    events.filter((event) => isSameDay(new Date(event.startDate), date));

export { isSameDay, _getTodaysEvents };
