import { CalendarWeekViewProps } from "@/components/Calendar/types";
import CalendarGoogleWeekView from "@/components/CalendarGoogle/Views/Week";
import { FC } from "react";
import CalendarWeekViewCell from "@/components/Calendar/Views/Week/Cell";
import useFilteredEvents from "./_hooks/useFilteredEvents";
import { useFiltersContext } from "../Filters/context";
import WithDragEnd from "./_hocs/WithDragEnd";
import WithResize from "./_hocs/WithResize";
import WithClick from "./_hocs/WithClick";

// --------------------------------------------------------------------------

const Cell = WithResize(WithDragEnd(WithClick(CalendarWeekViewCell)));

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
