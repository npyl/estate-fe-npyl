import CalendarGoogle from "@/components/CalendarGoogle";
import StyledHeader from "./Header";
import WithActions from "./WithActions";

import dynamic from "next/dynamic";

const Filters = dynamic(() => import("./Filters"));
import { FiltersProvider } from "./Filters/context";

const CalendarGoogleDayView = dynamic(() => import("./Views/Day"));
import CalendarGoogleWeekView from "./Views/Week";
const CalendarGoogleMonthView = dynamic(() => import("./Views/Month"));
const CalendarGoogleYearView = dynamic(() => import("./Views/Year"));

import useResponsive from "@/hooks/useResponsive";

const CalendarSection = () => {
    const belowSm = useResponsive("down", "sm");

    return (
        <FiltersProvider>
            <Filters />

            <CalendarGoogle
                view={belowSm ? "day" : undefined}
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
        </FiltersProvider>
    );
};

export default CalendarSection;
