import { CalendarDayViewProps } from "@/components/Calendar/types";
import CalendarMonthView from "@/components/Calendar/Views/Month";
import { FC } from "react";
import fakeEvents from "./fakeEvents";

const CalendarGoogleMonthView: FC<CalendarDayViewProps> = ({
    events = [],
    ...props
}) => <CalendarMonthView {...props} events={fakeEvents} />;

export default CalendarGoogleMonthView;
