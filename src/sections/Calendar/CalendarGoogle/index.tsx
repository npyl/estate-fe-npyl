import Calendar from "@/components/Calendar";
import { useAuth } from "@/hooks/use-auth";
import { useGetAllEventsQuery } from "@/services/calendar";
import CalendarGoogleButtonGroup from "./ButtonGroup";

// const { user } = useAuth();
// const { data } = useGetAllEventsQuery(user?.id!);

const CalendarGoogle = () => (
    <Calendar
        HeaderSlots={{
            ViewButtonGroup: CalendarGoogleButtonGroup,
        }}
    />
);

export default CalendarGoogle;
