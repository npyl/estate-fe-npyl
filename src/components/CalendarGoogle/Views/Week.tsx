import { CalendarDayViewProps } from "@/components/Calendar/types";
import CalendarWeekView from "@/components/Calendar/Views/Week";
import { FC } from "react";
import { useAuth } from "@/hooks/use-auth";
import { getEndOfWeek, getStartOfWeek } from "@/components/BaseCalendar/util";
import { useGetEventsQuery } from "@/services/calendar";

const CalendarGoogleWeekView: FC<CalendarDayViewProps> = ({
    events = [],
    ...props
}) => {
    const { user } = useAuth();

    const startDate = getStartOfWeek(props.date).toISOString();
    const endDate = getEndOfWeek(props.date).toISOString();

    const { data } = useGetEventsQuery({
        userId: user?.id!,
        startDate,
        endDate,
    });

    return <CalendarWeekView {...props} events={data || []} />;
};

export default CalendarGoogleWeekView;
