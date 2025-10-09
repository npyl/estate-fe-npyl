import { useGetRegionsQuery } from "@/services/location";
import CustomMenuItem from "./CustomMenuItem";
import Skeleton from "./Skeleton";
import React, { FC, useMemo } from "react";
import withSearch from "./withSearch";
import {
    useFiltersContext,
    useRegions,
} from "@/sections/Properties/FiltersContext";

interface Props {
    search: string;
}

const RegionsTab: FC<Props> = ({ search }) => {
    const { data, isLoading } = useGetRegionsQuery();

    const regionsOptions = useMemo(
        () => data?.filter(withSearch(search)),
        [data, search]
    );

    const { setRegions } = useFiltersContext();
    const regions = useRegions() || [];

    const handleClick = (areaID: number) => {
        const newValues = regions.includes(areaID.toString())
            ? regions.filter((id) => id !== areaID.toString())
            : [...regions, areaID.toString()];

        setRegions(newValues);
    };

    return (
        <>
            {regionsOptions?.map((o) => (
                <CustomMenuItem
                    key={o.areaID}
                    selected={regions.indexOf(o.areaID.toString()) > -1}
                    onClick={handleClick}
                    o={o}
                />
            ))}

            {/* Skeletons */}
            {isLoading ? <Skeleton /> : null}
        </>
    );
};

export default React.memo(RegionsTab);
