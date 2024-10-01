import { selectCities, selectRegions } from "@/slices/filters";
import { Chip } from "@mui/material";
import { useSelector } from "react-redux";

const RenderValues = () => {
    const regions = useSelector(selectRegions) || [];
    const cities = useSelector(selectCities) || [];

    const count = regions.length + cities.length;

    if (count === 0) return null;

    return <Chip label={count} />;
};

export default RenderValues;
