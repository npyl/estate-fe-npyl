import { CalendarMonthViewProps } from "@/components/Calendar/types";
import { FC } from "react";
import CalendarGoogleMonthView from "@/components/CalendarGoogle/Views/Month";
import CalendarMonthViewCell from "@/components/Calendar/Views/Month/Cell";
import useFilteredEvents from "./useFilteredEvents";
import { useFiltersContext } from "../Filters/context";
import WithEventClick from "./WithEventClick";
import WithTimeOffsetClick from "./WithTimeOffsetClick";

// --------------------------------------------------------------------------

const Cell = WithTimeOffsetClick(WithEventClick(CalendarMonthViewCell));

// --------------------------------------------------------------------------

const MonthView: FC<CalendarMonthViewProps> = (props) => {
    const { calendarId } = useFiltersContext();
    const { getCellEvents } = useFilteredEvents();

    return (
        <CalendarGoogleMonthView
            {...props}
            filters={{ calendarId }}
            getCellEvents={getCellEvents}
            Cell={Cell}
        />
    );
};

export default MonthView;
