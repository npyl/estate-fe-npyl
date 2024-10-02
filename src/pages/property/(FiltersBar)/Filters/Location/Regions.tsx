import { useGetRegionsQuery } from "@/services/location";
import CustomMenuItem from "./CustomMenuItem";
import { useSelector } from "react-redux";
import { selectRegions, setRegions } from "@/slices/filters";
import Skeleton from "./Skeleton";
import { useDispatch } from "react-redux";

const RegionsTab = () => {
    const dispatch = useDispatch();

    const { data: regionsOptions, isLoading } = useGetRegionsQuery();
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

export default RegionsTab;
