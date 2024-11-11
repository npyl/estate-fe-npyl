import { useAuth } from "@/hooks/use-auth";
import { useGetEventsQuery } from "@/services/calendar";

const getMonthStartEndDates = (date: Date) => {
    const startDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        1
    ).toISOString();

    const endDate = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
    ).toISOString();

    return {
        // Get the first day of the month
        startDate,
        // Get the last day of the month
        endDate,
    };
};

const useMonthEvents = (date: Date, filters?: object) => {
    const { user } = useAuth();

    const { startDate, endDate } = getMonthStartEndDates(date);

    const { data, isLoading } = useGetEventsQuery({
        userId: user?.id!,
        startDate,
        endDate,
        filters,
    });

    return { data, isLoading };
};

export default useMonthEvents;
