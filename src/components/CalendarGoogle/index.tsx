import dynamic from "next/dynamic";
import Calendar from "@/components/Calendar";
import CalendarGoogleButtonGroup from "./ButtonGroup";
// views
const CalendarGoogleDayView = dynamic(() => import("./Views/Day"));
import CalendarGoogleWeekView from "./Views/Week";
const CalendarGoogleMonthView = dynamic(() => import("./Views/Month"));
const CalendarGoogleYearView = dynamic(() => import("./Views/Year"));

import { CalendarGoogleProps } from "./types";
import { FC } from "react";
import CalendarView from "./View";

const CalendarGoogle: FC<CalendarGoogleProps> = ({
    HeaderSlots,
    ViewSlots,
    slots,
    ...props
}) => (
    <Calendar
        ViewSlots={{
            DayView: CalendarGoogleDayView,
            WeekView: CalendarGoogleWeekView,
            MonthView: CalendarGoogleMonthView,
            YearView: CalendarGoogleYearView,
            ...ViewSlots,
        }}
        HeaderSlots={{
            ViewButtonGroup: CalendarGoogleButtonGroup,
            ...HeaderSlots,
        }}
        slots={{
            View: CalendarView,
            ...slots,
        }}
        {...props}
    />
);

export default CalendarGoogle;
