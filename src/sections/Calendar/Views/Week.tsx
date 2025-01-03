import { CalendarWeekViewProps } from "@/components/Calendar/types";
import CalendarGoogleWeekView from "@/components/CalendarGoogle/Views/Week";
import { FC } from "react";
import CalendarWeekViewCell from "@/components/Calendar/Views/Week/Cell";
import useFilteredEvents from "./useFilteredEvents";
import { useFiltersContext } from "../Filters/context";
import WithEventClick from "./WithEventClick";
import WithTimeOffsetClick from "./WithTimeOffsetClick";

// --------------------------------------------------------------------------

const Cell = WithTimeOffsetClick(WithEventClick(CalendarWeekViewCell));

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
