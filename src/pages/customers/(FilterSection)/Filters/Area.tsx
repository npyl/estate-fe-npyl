import {
    selectMaxArea,
    selectMinArea,
    setMaxArea,
    setMinArea,
} from "src/slices/customer/filters";

import RangeSelect from "@/sections/Filters/Range";

import areaRangeGenerator from "@/sections/Filters/areaRangeGenerator";
import { useSelector } from "react-redux";

const AreaSelect = () => {
    const minArea = useSelector(selectMinArea);
    const maxArea = useSelector(selectMaxArea);

    return (
        <RangeSelect
            type="area"
            valueMin={minArea}
            valueMax={maxArea}
            setMin={setMinArea}
            setMax={setMaxArea}
            generateNumbers={areaRangeGenerator}
        />
    );
};

export default AreaSelect;
