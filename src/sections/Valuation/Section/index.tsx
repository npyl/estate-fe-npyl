import { useAllFilters } from "@/sections/Properties/FiltersContext";
import { useValuationByFiltersQuery } from "@/services/properties";
import Skeleton from "./Skeleton";
import Content from "./Content";

const Section = () => {
    const filters = useAllFilters();
    const { data, isLoading } = useValuationByFiltersQuery(filters);

    if (isLoading) return <Skeleton />;
    if (!data) return null;

    return <Content valuation={data} />;
};

export default Section;
