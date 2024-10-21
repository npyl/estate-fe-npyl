import CalendarGoogle from "@/components/CalendarGoogle";
import StyledHeader from "./Header";
import WithActions from "./WithActions";

import dynamic from "next/dynamic";

const CalendarGoogleDayView = dynamic(
    () => import("@/components/CalendarGoogle/Views/Day")
);
import CalendarGoogleWeekView from "@/components/CalendarGoogle/Views/Week";
const CalendarGoogleMonthView = dynamic(
    () => import("@/components/CalendarGoogle/Views/Month")
);
const CalendarGoogleYearView = dynamic(
    () => import("@/components/CalendarGoogle/Views/Year")
);

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
