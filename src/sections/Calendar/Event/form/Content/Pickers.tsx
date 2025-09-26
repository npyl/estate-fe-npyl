import EventDates from "./EventDates";
import useEventDates from "./EventDates/useEventDates";
import { endDateKey, startDateKey } from "./EventDates/constants";
import { FC } from "react";

interface Props {
    startDate?: string;
    endDate?: string;
}

const Pickers: FC<Props> = ({ startDate, endDate }) => {
    const initial = startDate && endDate ? { startDate, endDate } : undefined;

    const { isAllDay, onAllDayChange } = useEventDates(
        startDateKey,
        endDateKey,
        initial
    );

    return <EventDates allDay={isAllDay} onAllDayChange={onAllDayChange} />;
};

export default Pickers;
