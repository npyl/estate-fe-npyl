import { useWatch } from "react-hook-form";
import useEventDates from "@/sections/Calendar/Event/form/Content/EventDates/useEventDates";
import EventDates from "@/sections/Calendar/Event/form/Content/EventDates";
import { endDateKey, startDateKey } from "./constants";

const Pickers = () => {
    const due = useWatch({ name: "due" });

    const { isAllDay, onAllDayChange } = useEventDates(
        startDateKey,
        endDateKey,
        {
            startDate: due?.[0],
            endDate: due?.[1],
        }
    );

    return (
        <EventDates
            allDay={isAllDay}
            // ...
            onAllDayChange={onAllDayChange}
            // ...
            startDateKey={startDateKey}
            endDateKey={endDateKey}
            // ...
            direction="column"
        />
    );
};

export default Pickers;
