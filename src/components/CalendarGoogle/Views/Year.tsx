import { CalendarDayViewProps } from "@/components/Calendar/types";
import { FC } from "react";
import CalendarYearView from "@/components/Calendar/Views/Year";
import fakeEvents from "./fakeEvents";

const CalendarGoogleYearView: FC<CalendarDayViewProps> = ({
    events = [],
    ...props
}) => <CalendarYearView {...props} events={fakeEvents} />;

export default CalendarGoogleYearView;
