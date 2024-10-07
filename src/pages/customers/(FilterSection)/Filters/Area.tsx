import {
    selectMaxArea,
    selectMinArea,
    setMaxArea,
    setMinArea,
} from "src/slices/customer/filters";

import RangeSelect from "@/sections/Filters/Range";

const AreaSelect = () => (
    <RangeSelect
        type="area"
        selectMin={selectMinArea}
        selectMax={selectMaxArea}
        setMin={setMinArea}
        setMax={setMaxArea}
    />
);

export default AreaSelect;
