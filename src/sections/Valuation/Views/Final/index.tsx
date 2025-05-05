import { useAllFilters } from "@/sections/Properties/FiltersContext";
import { useValuationByFiltersQuery } from "@/services/properties";
import { IValuationRes } from "@/types/properties";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Content from "./Content";

const FakeData: IValuationRes = {
    normal: {
        min: 10,
        mid: 15,
        max: 20,
    },
    perSqm: {
        min: 10,
        mid: 15,
        max: 20,
    },
    smallSample: false,
};

const Final = () => {
    const filters = useAllFilters();
    const { data, isLoading } = useValuationByFiltersQuery(filters);

    if (isLoading)
        return <Skeleton variant="circular" width="50px" height="50px" />;

    // if (!data) return null;

    // if (data?.smallSample) return <RadiusPlaceholder />;

    return (
        <Stack width={1}>
            <Content valuation={FakeData} />
        </Stack>
    );
};

export default Final;
