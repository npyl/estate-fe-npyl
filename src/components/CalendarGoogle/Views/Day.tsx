import { CalendarDayViewProps } from "@/components/Calendar/types";
import CalendarDayView from "@/components/Calendar/Views/Day";
import { FC } from "react";
import useMonthEvents from "./useMonthEvents";

const CalendarGoogleDayView: FC<CalendarDayViewProps> = ({
    events = [],
    ...props
}) => {
    const { data } = useMonthEvents(props.date);
    return <CalendarDayView {...props} events={data || []} />;
};

export default CalendarGoogleDayView;
