import { CalendarDayViewProps } from "@/components/Calendar/types";
import CalendarWeekView from "@/components/Calendar/Views/Week";
import { FC } from "react";
import fakeEvents from "./fakeEvents";

const CalendarGoogleWeekView: FC<CalendarDayViewProps> = ({
    events = [],
    ...props
}) => <CalendarWeekView {...props} events={fakeEvents} />;

export default CalendarGoogleWeekView;
