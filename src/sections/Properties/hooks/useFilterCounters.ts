import { useGetFilterCountersQuery } from "@/services/properties";
import { useAllFilters } from "@/sections/Properties/FiltersContext";

const useFilterCounters = () => {
    const filters = useAllFilters();

    const { data: counters, isLoading: isCountersLoading } =
        useGetFilterCountersQuery(filters);

    return { counters, isCountersLoading };
};

export default useFilterCounters;
