import { CalendarWeekViewProps } from "@/components/Calendar/types";
import CalendarWeekView from "@/components/Calendar/Views/Week";
import { FC } from "react";
import { useAuth } from "@/hooks/use-auth";
import useWeekUtils from "@/components/BaseCalendar/useWeekUtils";
import { useGetEventsQuery } from "@/services/calendar";
import useEventsSplitter from "../useEventsSplitter";

const CalendarGoogleWeekView: FC<CalendarWeekViewProps> = ({
    events = [],
    filters,
    ...props
}) => {
    const { user } = useAuth();

    const { getStartOfWeek, getEndOfWeek } = useWeekUtils();

    const startDate = getStartOfWeek(props.date).toISOString();
    const endDate = getEndOfWeek(props.date).toISOString();

    const { data } = useGetEventsQuery({
        userId: user?.id!,
        startDate,
        endDate,
        filters,
    });

    const splitter = useEventsSplitter();

    return (
        <CalendarWeekView
            {...props}
            events={data || []}
            getMiscCellEvents={splitter}
        />
    );
};

export default CalendarGoogleWeekView;
