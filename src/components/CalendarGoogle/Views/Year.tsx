import {
    CalendarCellProps,
    CalendarDayViewProps,
} from "@/components/Calendar/types";
import { FC } from "react";
import CalendarYearView, {
    CalendarYearViewCell,
} from "@/components/Calendar/Views/Year";
import useMonthEvents from "./useMonthEvents";

// --------------------------------------------------------------------

const Cell: FC<CalendarCellProps> = ({ events = [], ...props }) => {
    const { data } = useMonthEvents(props.date);
    return <CalendarYearViewCell {...props} events={data || []} />;
};

// --------------------------------------------------------------------

const CalendarGoogleYearView: FC<CalendarDayViewProps> = ({
    events = [],
    ...props
}) => (
    <CalendarYearView
        {...props}
        Cell={(props) => (
            <Cell
                // TODO: this is not needed; the type does not support it but events are passed actually; must update the Cell props
                events={[]}
                {...props}
            />
        )}
    />
);

export default CalendarGoogleYearView;
