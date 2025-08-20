import useWeekUtils from "@/components/BaseCalendar/useWeekUtils";
import CalendarGoogle from "@/sections/Calendar";
import { useMemo } from "react";
import { START_OF_WEEK_ID } from "./constants";

const CalendarTester = () => {
    const { getStartOfWeek } = useWeekUtils();

    const weekStart = useMemo(
        () => getStartOfWeek(new Date()).toISOString(),
        [getStartOfWeek]
    );

    return (
        <>
            {/* Start of Week */}
            <div data-testid={START_OF_WEEK_ID}>{weekStart}</div>

            <CalendarGoogle />
        </>
    );
};

export default CalendarTester;
