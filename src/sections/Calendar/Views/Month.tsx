import { CalendarMonthViewProps } from "@/components/Calendar/types";
import { FC } from "react";
import CalendarGoogleMonthView from "@/components/CalendarGoogle/Views/Month";
import CalendarMonthViewCell from "@/components/Calendar/Views/Month/Cell";
import useFilteredEvents from "./_hooks/useFilteredEvents";
import { useFiltersContext } from "../Filters/context";
import WithClick from "./_hocs/WithClick";

// --------------------------------------------------------------------------

const Cell = WithClick(CalendarMonthViewCell);

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
