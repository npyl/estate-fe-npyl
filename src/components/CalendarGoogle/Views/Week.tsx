import { CalendarDayViewProps } from "@/components/Calendar/types";
import CalendarWeekView from "@/components/Calendar/Views/Week";
import { FC } from "react";
import useMonthEvents from "./useMonthEvents";

const CalendarGoogleWeekView: FC<CalendarDayViewProps> = ({
    events = [],
    ...props
}) => {
    const { data } = useMonthEvents(props.date);
    return <CalendarWeekView {...props} events={data || []} />;
};

export default CalendarGoogleWeekView;
