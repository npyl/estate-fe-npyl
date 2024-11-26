import { CalendarDayViewProps } from "@/components/Calendar/types";
import CalendarWeekView from "@/components/Calendar/Views/Week";
import { FC } from "react";
import { useAuth } from "@/hooks/use-auth";
import useWeekUtils from "@/components/BaseCalendar/useWeekUtils";
import { useGetEventsQuery } from "@/services/calendar";

const CalendarGoogleWeekView: FC<CalendarDayViewProps> = ({
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

    return <CalendarWeekView {...props} events={data || []} />;
};

export default CalendarGoogleWeekView;
