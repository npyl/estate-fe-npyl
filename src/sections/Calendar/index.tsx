import CalendarGoogle from "@/components/CalendarGoogle";
import StyledHeader from "./Header";
import WithActions from "./WithActions";

import dynamic from "next/dynamic";

const CalendarGoogleDayView = dynamic(() => import("./Views/Day"));
import CalendarGoogleWeekView from "./Views/Week";
const CalendarGoogleMonthView = dynamic(() => import("./Views/Month"));
const CalendarGoogleYearView = dynamic(() => import("./Views/Year"));

const CalendarSection = () => (
    <CalendarGoogle
        ViewSlots={{
            DayView: WithActions(CalendarGoogleDayView),
            WeekView: WithActions(CalendarGoogleWeekView),
            MonthView: WithActions(CalendarGoogleMonthView),
            YearView: WithActions(CalendarGoogleYearView),
        }}
        slots={{
            Header: StyledHeader,
        }}
    />
);

export default CalendarSection;
