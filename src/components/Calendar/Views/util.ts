import { TCalendarEvent } from "../types";
import { isSameDay } from "../util";

const _getTodaysEvents = (events: TCalendarEvent[], date: Date) =>
    events.filter((event) => isSameDay(new Date(event.startDate), date));

export { isSameDay, _getTodaysEvents };
