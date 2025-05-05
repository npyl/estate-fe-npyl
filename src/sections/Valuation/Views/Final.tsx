import { useAllFilters } from "@/sections/Properties/FiltersContext";
import { useValuationByFiltersQuery } from "@/services/properties";
import { IValuationRes } from "@/types/properties";
import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Unstable_Grid2";
import { FC } from "react";

const RadiusPlaceholder = () => null;

interface ContentProps {
    valuation?: IValuationRes;
}

const Content: FC<ContentProps> = ({ valuation }) => (
    <Grid container>
        <Grid xs={12} sm={6}></Grid>
        <Grid xs={12} sm={6}></Grid>
    </Grid>
);

const Final = () => {
    const filters = useAllFilters();
    const { data, isLoading } = useValuationByFiltersQuery(filters);

    if (isLoading)
        return <Skeleton variant="circular" width="50px" height="50px" />;

    if (!data) return null;

    if (data?.smallSample) return <RadiusPlaceholder />;

    return <Content valuation={data} />;
};

export default Final;
