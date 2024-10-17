import {
    CalendarDayViewProps,
    TCalendarEvent,
} from "@/components/Calendar/types";
import CalendarMonthView from "@/components/Calendar/Views/Month";
import { FC } from "react";
import useMonthEvents from "./useMonthEvents";

// INFO: we pass all events because we get the whole month's events from the hook
const passAllEvents = (events: TCalendarEvent[]) => events;

const CalendarGoogleMonthView: FC<CalendarDayViewProps> = ({
    events = [],
    ...props
}) => {
    const { data } = useMonthEvents(props.date);

    return (
        <CalendarMonthView
            {...props}
            events={data || []}
            getCellEvents={passAllEvents}
        />
    );
};

export default CalendarGoogleMonthView;
