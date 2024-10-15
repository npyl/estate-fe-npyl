import Calendar from "@/components/Calendar";
import { useAuth } from "@/hooks/use-auth";
import { useGetAllEventsQuery } from "@/services/calendar";

const CalendarGoogle = () => {
    const { user } = useAuth();
    const { data } = useGetAllEventsQuery(user?.id!);
    console.log("EVENTS: ", data);
    return <Calendar />;
};

export default CalendarGoogle;
