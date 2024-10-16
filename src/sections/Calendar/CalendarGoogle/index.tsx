import Calendar from "@/components/Calendar";

import CalendarGoogleButtonGroup from "./ButtonGroup";
import { FC } from "react";
import { CalendarDayViewProps } from "@/components/Calendar/types";
const CalendarDayView = dynamic(
    () => import("@/components/Calendar/Views/Day")
);
import CalendarWeekView from "@/components/Calendar/Views/Week";
const CalendarMonthView = dynamic(
    () => import("@/components/Calendar/Views/Month")
);
const CalendarYearView = dynamic(
    () => import("@/components/Calendar/Views/Year")
);
import fakeEvents from "./fakeEvents";
import dynamic from "next/dynamic";

// import { useAuth } from "@/hooks/use-auth";
// import { useGetAllEventsQuery } from "@/services/calendar";
// const { user } = useAuth();
// const { data } = useGetAllEventsQuery(user?.id!);

const CalendarGoogleDayView: FC<CalendarDayViewProps> = ({
    events = [],
    ...props
}) => <CalendarDayView {...props} events={fakeEvents} />;

const CalendarGoogleWeekView: FC<CalendarDayViewProps> = ({
    events = [],
    ...props
}) => <CalendarWeekView {...props} events={fakeEvents} />;
const CalendarGoogleMonthView: FC<CalendarDayViewProps> = ({
    events = [],
    ...props
}) => <CalendarMonthView {...props} events={fakeEvents} />;
const CalendarGoogleYearView: FC<CalendarDayViewProps> = ({
    events = [],
    ...props
}) => <CalendarYearView {...props} events={fakeEvents} />;

const CalendarGoogle = () => (
    <Calendar
        ViewSlots={{
            DayView: CalendarGoogleDayView,
            WeekView: CalendarGoogleWeekView,
            MonthView: CalendarGoogleMonthView,
            YearView: CalendarGoogleYearView,
        }}
        HeaderSlots={{
            ViewButtonGroup: CalendarGoogleButtonGroup,
        }}
    />
);

export default CalendarGoogle;
