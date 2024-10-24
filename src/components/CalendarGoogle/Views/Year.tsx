import {
    CalendarCellProps,
    CalendarDayViewProps,
} from "@/components/Calendar/types";
import { FC } from "react";
import CalendarYearView from "@/components/Calendar/Views/Year";
import useMonthEvents from "./useMonthEvents";
import CalendarYearViewCell from "@/components/Calendar/Views/Year/Cell";

// --------------------------------------------------------------------

export const CalendarGoogleYearViewCell: FC<CalendarCellProps> = ({
    events = [],
    ...props
}) => {
    const { data } = useMonthEvents(props.date);
    return <CalendarYearViewCell {...props} events={data || []} />;
};

// --------------------------------------------------------------------

const CalendarGoogleYearView: FC<CalendarDayViewProps> = ({
    events = [],
    // ...
    onEventClick,
    // ...
    ...props
}) => (
    <CalendarYearView
        Cell={(props) => (
            <CalendarGoogleYearViewCell
                // TODO: this is not needed; the type does not support it but events are passed actually; must update the Cell props
                events={[]}
                {...props}
                onEventClick={onEventClick}
            />
        )}
        {...props}
    />
);

export default CalendarGoogleYearView;
