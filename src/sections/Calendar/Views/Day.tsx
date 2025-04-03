import { CalendarDayViewProps } from "@/components/Calendar/types";
import CalendarGoogleDayView from "@/components/CalendarGoogle/Views/Day";
import { FC } from "react";
import CalendarDayViewCell from "@/components/Calendar/Views/Day/Cell";
import useFilteredEvents from "./_hooks/useFilteredEvents";
import { useFiltersContext } from "../Filters/context";
import WithEventClick from "./_hocs/WithEventClick";
import WithTimeOffsetClick from "./_hocs/WithTimeOffsetClick";
import WithDragEnd from "./_hocs/WithDragEnd";
import WithResize from "./_hocs/WithResize";

// --------------------------------------------------------------------------

const Cell = WithResize(
    WithDragEnd(WithTimeOffsetClick(WithEventClick(CalendarDayViewCell)))
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
