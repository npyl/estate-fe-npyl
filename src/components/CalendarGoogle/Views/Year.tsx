import {
    CalendarCellProps,
    CalendarDayViewProps,
} from "@/components/Calendar/types";
import { FC } from "react";
import CalendarYearView from "@/components/Calendar/Views/Year";
import useMonthEvents from "./useMonthEvents";
import CalendarYearViewCell from "@/components/Calendar/Views/Year/Cell";

// --------------------------------------------------------------------

interface YearCellProps extends CalendarCellProps {
    filters?: object;
}

export const CalendarGoogleYearViewCell: FC<YearCellProps> = ({
    events = [],
    filters,
    ...props
}) => {
    const { data } = useMonthEvents(props.date, filters);
    return <CalendarYearViewCell {...props} events={data || []} />;
};

// --------------------------------------------------------------------

const CalendarGoogleYearView: FC<CalendarDayViewProps> = ({
    events = [],
    filters,
    // ...
    onEventClick,
    // ...
    ...props
}) => (
    <CalendarYearView
        Cell={(props) => (
            <CalendarGoogleYearViewCell
                {...props}
                filters={filters}
                onEventClick={onEventClick}
            />
        )}
        {...props}
    />
);

export default CalendarGoogleYearView;
