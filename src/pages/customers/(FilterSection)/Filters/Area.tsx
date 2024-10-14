import {
    selectMaxArea,
    selectMinArea,
    setMaxArea,
    setMinArea,
} from "src/slices/customer/filters";

import RangeSelect from "@/sections/Filters/Range";

import rangeGenerator from "./rangeGenerator";

const AreaSelect = () => (
    <RangeSelect
        type="area"
        selectMin={selectMinArea}
        selectMax={selectMaxArea}
        setMin={setMinArea}
        setMax={setMaxArea}
        generateNumbers={rangeGenerator}
    />
);

export default AreaSelect;
