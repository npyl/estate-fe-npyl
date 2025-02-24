import {
    selectMaxArea,
    selectMinArea,
    setMaxArea,
    setMinArea,
} from "src/slices/customer/filters";

import RangeSelect from "@/sections/Filters/Range";

import areaRangeGenerator from "@/sections/Filters/areaRangeGenerator";

const AreaSelect = () => (
    <RangeSelect
        type="area"
        selectMin={selectMinArea}
        selectMax={selectMaxArea}
        setMin={setMinArea}
        setMax={setMaxArea}
        generateNumbers={areaRangeGenerator}
    />
);

export default AreaSelect;
