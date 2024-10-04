import { useGetFilterCountersQuery } from "@/services/properties";
import { selectAll } from "@/slices/filters";
import { useSelector } from "react-redux";

const useFilterCounters = () => {
    const filters = useSelector(selectAll);
    const { data: counters, isLoading: isCountersLoading } =
        useGetFilterCountersQuery(filters);
    return { counters, isCountersLoading };
};

export default useFilterCounters;
