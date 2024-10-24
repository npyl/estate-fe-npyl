import CalendarGoogle from "@/components/CalendarGoogle";
import StyledHeader from "./Header";
import WithActions from "./WithActions";

import dynamic from "next/dynamic";

const CalendarGoogleDayView = dynamic(() => import("./Views/Day"));
import CalendarGoogleWeekView from "./Views/Week";
import { Skeleton } from "@mui/material";
const CalendarGoogleMonthView = dynamic(() => import("./Views/Month"));
const CalendarGoogleYearView = dynamic(() => import("./Views/Year"));

const Filters = dynamic(() => import("./Filters"), {
    loading: () => <Skeleton width="150px" height="58px" />,
});

const CalendarSection = () => (
    <>
        <Filters />

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
    </>
);

export default CalendarSection;
