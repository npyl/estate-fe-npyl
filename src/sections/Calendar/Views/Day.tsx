import { CalendarDayViewProps } from "@/components/Calendar/types";
import CalendarGoogleDayView from "@/components/CalendarGoogle/Views/Day";
import { FC } from "react";
import CalendarDayViewCell from "@/components/Calendar/Views/Day/Cell";
import useFilteredEvents from "./_hooks/useFilteredEvents";
import { useFiltersContext } from "../Filters/context";
import WithClick from "./_hocs/WithClick";
import WithDrag from "./_hocs/WithDrag";
import WithResize from "./_hocs/WithResize";

// --------------------------------------------------------------------------

const Cell = WithResize(WithDrag(WithClick(CalendarDayViewCell)));

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
