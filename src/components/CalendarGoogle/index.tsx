import dynamic from "next/dynamic";
import Calendar from "@/components/Calendar";
import CalendarGoogleButtonGroup from "./ButtonGroup";
import WithDeleteConfirmation from "./WithDeleteConfirmation";
// views
const CalendarGoogleDayView = dynamic(() => import("./Views/Day"));
import CalendarGoogleWeekView from "./Views/Week";
const CalendarGoogleMonthView = dynamic(() => import("./Views/Month"));
const CalendarGoogleYearView = dynamic(() => import("./Views/Year"));

import { CalendarGoogleProps } from "./types";
import { FC } from "react";

const CalendarGoogle: FC<CalendarGoogleProps> = ({
    HeaderSlots,
    ViewSlots,
    ...props
}) => (
    <Calendar
        ViewSlots={{
            DayView: WithDeleteConfirmation(CalendarGoogleDayView),
            WeekView: WithDeleteConfirmation(CalendarGoogleWeekView),
            MonthView: WithDeleteConfirmation(CalendarGoogleMonthView),
            YearView: WithDeleteConfirmation(CalendarGoogleYearView),
            ...ViewSlots,
        }}
        HeaderSlots={{
            ViewButtonGroup: CalendarGoogleButtonGroup,
            ...HeaderSlots,
        }}
        {...props}
    />
);

export default CalendarGoogle;
