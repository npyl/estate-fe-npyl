import { CalendarWeekViewProps } from "@/components/Calendar/types";
import CalendarGoogleWeekView from "@/components/CalendarGoogle/Views/Week";
import { FC } from "react";
import CalendarWeekViewCell from "@/components/Calendar/Views/Week/Cell";
import useFilteredEvents from "./_hooks/useFilteredEvents";
import { useFiltersContext } from "../Filters/context";
import WithEventClick from "./_hocs/WithEventClick";
import WithTimeOffsetClick from "./_hocs/WithTimeOffsetClick";
import WithDragEnd from "./_hocs/WithDragEnd";
import WithResize from "./_hocs/WithResize";

// --------------------------------------------------------------------------

const Cell = WithResize(
    WithDragEnd(WithTimeOffsetClick(WithEventClick(CalendarWeekViewCell)))
);

// --------------------------------------------------------------------------

const WeekView: FC<CalendarWeekViewProps> = (props) => {
    const { calendarId } = useFiltersContext();
    const { getCellEvents } = useFilteredEvents();

    return (
        <CalendarGoogleWeekView
            {...props}
            filters={{ calendarId }}
            getCellEvents={getCellEvents}
            Cell={Cell}
        />
    );
};

export default WeekView;
