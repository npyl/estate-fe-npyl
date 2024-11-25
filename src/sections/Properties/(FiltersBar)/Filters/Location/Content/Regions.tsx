import { useGetRegionsQuery } from "@/services/location";
import CustomMenuItem from "./CustomMenuItem";
import { useSelector } from "react-redux";
import { selectRegions, setRegions } from "@/slices/filters";
import Skeleton from "./Skeleton";
import { useDispatch } from "react-redux";
import React, { FC, useMemo } from "react";
import withSearch from "./withSearch";

interface Props {
    search: string;
}

const RegionsTab: FC<Props> = ({ search }) => {
    const dispatch = useDispatch();

    const { data, isLoading } = useGetRegionsQuery();

    const regionsOptions = useMemo(
        () => data?.filter(withSearch(search)),
        [data, search]
    );

    const regions = useSelector(selectRegions) || [];

    const handleClick = (areaID: number) => {
        const newValues = regions.includes(areaID.toString())
            ? regions.filter((id) => id !== areaID.toString())
            : [...regions, areaID.toString()];

        dispatch(setRegions(newValues));
    };

    return (
        <>
            {regionsOptions?.map((o) => (
                <CustomMenuItem
                    key={o.areaID}
                    checked={regions.indexOf(o.areaID.toString()) > -1}
                    onClick={handleClick}
                    {...o}
                />
            ))}

            {/* Skeletons */}
            {isLoading ? <Skeleton /> : null}
        </>
    );
};

export default React.memo(RegionsTab);
