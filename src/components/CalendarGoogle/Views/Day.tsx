import { CalendarDayViewProps } from "@/components/Calendar/types";
import CalendarDayView from "@/components/Calendar/Views/Day";
import { FC } from "react";
import fakeEvents from "./fakeEvents";

const CalendarGoogleDayView: FC<CalendarDayViewProps> = ({
    events = [],
    ...props
}) => <CalendarDayView {...props} events={fakeEvents} />;

export default CalendarGoogleDayView;
