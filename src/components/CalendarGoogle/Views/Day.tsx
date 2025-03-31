import { CalendarDayViewProps } from "@/components/Calendar/types";
import CalendarDayView from "@/components/Calendar/Views/Day";
import { FC } from "react";
import useMonthEvents from "./useMonthEvents";
import useEventsSplitter from "../useEventsSplitter";

const CalendarGoogleDayView: FC<CalendarDayViewProps> = ({
    events = [],
    filters,
    ...props
}) => {
    const { data } = useMonthEvents(props.date, filters);
    const splitter = useEventsSplitter();
    return (
        <CalendarDayView
            {...props}
            events={data || []}
            getMiscCellEvents={splitter}
        />
    );
};

export default CalendarGoogleDayView;
