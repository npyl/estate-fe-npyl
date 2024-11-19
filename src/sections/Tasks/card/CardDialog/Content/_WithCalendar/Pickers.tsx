import { useFormContext } from "react-hook-form";
import useEventDates from "@/sections/Calendar/Event/form/EventDates/useEventDates";
import EventDates from "@/sections/Calendar/Event/form/EventDates";
import { endDateKey, startDateKey } from "./constants";

const Pickers = () => {
    const { watch } = useFormContext();

    const due = watch("due");

    const {
        isAllDay,
        allDayDate,
        // ...
        onAllDayChange,
        onAllDayDateChange,
    } = useEventDates(startDateKey, endDateKey, {
        startDate: due?.[0],
        endDate: due?.[1],
    });

    return (
        <EventDates
            allDay={isAllDay}
            allDayDate={allDayDate}
            // ...
            onAllDayChange={onAllDayChange}
            onAllDayDateChange={onAllDayDateChange}
            // ...
            startDateKey={startDateKey}
            endDateKey={endDateKey}
            // ...
            direction="column"
        />
    );
};

export default Pickers;
