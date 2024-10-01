import { Select } from "@mui/material";
import { useSelector } from "react-redux";
import { selectRegions } from "src/slices/filters";
import Tabs from "./Tabs";
import RenderValues from "./RenderValues";

// ----------------------------------------------------------------------

export default function Location() {
    const regions = useSelector(selectRegions) || [];

    // dummy value to trigger RenderValues
    let value = [];
    if (regions.length > 0) value.push(1);

    return (
        <Select multiple value={value} renderValue={() => <RenderValues />}>
            <Tabs />
        </Select>
    );
}
