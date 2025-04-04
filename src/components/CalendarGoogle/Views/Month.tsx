import { CalendarMonthViewProps } from "@/components/Calendar/types";
import CalendarMonthView from "@/components/Calendar/Views/Month";
import { FC } from "react";
import useMonthEvents from "./useMonthEvents";

const CalendarGoogleMonthView: FC<CalendarMonthViewProps> = ({
    events = [],
    filters,
    ...props
}) => {
    const { data } = useMonthEvents(props.date, filters);
    return <CalendarMonthView {...props} events={data || []} />;
};

export default CalendarGoogleMonthView;
