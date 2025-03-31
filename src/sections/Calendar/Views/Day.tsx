import {
    CalendarCellProps,
    CalendarDayViewProps,
} from "@/components/Calendar/types";
import CalendarGoogleDayView from "@/components/CalendarGoogle/Views/Day";
import { ComponentType, FC } from "react";
import CalendarDayViewCell from "@/components/Calendar/Views/Day/Cell";
import useFilteredEvents from "./useFilteredEvents";
import { useFiltersContext } from "../Filters/context";
import WithEventClick from "./WithEventClick";
import WithTimeOffsetClick from "./WithTimeOffsetClick";
import WithDragEnd from "./WithDragEnd";

// --------------------------------------------------------------------------

const Cell = WithDragEnd(
    WithTimeOffsetClick(WithEventClick(CalendarDayViewCell))
);

// --------------------------------------------------------------------------

const DayView: FC<CalendarDayViewProps> = (props) => {
    const { calendarId } = useFiltersContext();
    const { getCellEvents } = useFilteredEvents();

    return (
        <CalendarGoogleDayView
            {...props}
            filters={{ calendarId }}
            getCellEvents={getCellEvents}
            Cell={Cell}
        />
    );
};

export default DayView;
