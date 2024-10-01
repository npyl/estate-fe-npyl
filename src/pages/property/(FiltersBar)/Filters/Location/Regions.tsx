import { useGetRegionsQuery } from "@/services/location";
import CustomMenuItem from "./CustomMenuItem";
import { useSelector } from "react-redux";
import { selectRegions } from "@/slices/filters";
import Skeleton from "./Skeleton";

const RegionsTab = () => {
    const { data: regionsOptions, isLoading } = useGetRegionsQuery();
    const regions = useSelector(selectRegions);

    return (
        <>
            {regionsOptions?.map((o) => (
                <CustomMenuItem
                    key={o.areaID}
                    checked={regions.indexOf(o.areaID.toString()) > -1}
                    {...o}
                />
            ))}

            {/* Skeletons */}
            {isLoading ? <Skeleton /> : null}
        </>
    );
};

export default RegionsTab;
