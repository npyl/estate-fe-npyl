import { useAuth } from "@/hooks/use-auth";
import { useGetEventsQuery } from "@/services/calendar";

const getMonthStartEndDates = (date: Date) => {
    // Create a new date object to avoid modifying the original
    const inputDate = new Date(date);

    // Set to first day of the current month
    const startDate = new Date(
        inputDate.getFullYear(),
        inputDate.getMonth(),
        1
    ).toISOString();

    // Set to first day of next month, then subtract 1 millisecond
    // This ensures we get the last moment of the current month
    const endDate = new Date(
        inputDate.getFullYear(),
        inputDate.getMonth() + 1,
        1
    );
    endDate.setMilliseconds(-1);

    return {
        startDate,
        endDate: endDate.toISOString(),
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
