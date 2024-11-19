import EventDates from "./EventDates";
import useEventDates from "./EventDates/useEventDates";
import { endDateKey, startDateKey } from "./EventDates/constants";
import { FC } from "react";

interface Props {
    startDate: string;
    endDate: string;
}

const Pickers: FC<Props> = ({ startDate, endDate }) => {
    const {
        _isAllDay,
        _allDayDate,
        // ..
        isAllDay,
        allDayDate,
        // ...
        onAllDayChange,
        onAllDayDateChange,
    } = useEventDates(startDateKey, endDateKey, {
        startDate,
        endDate,
    });

    return (
        <EventDates
            allDay={isAllDay}
            onAllDayChange={onAllDayChange}
            allDayDate={allDayDate}
            onAllDayDateChange={onAllDayDateChange}
        />
    );
};

export default Pickers;
