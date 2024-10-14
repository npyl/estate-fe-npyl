import {
    selectMaxArea,
    selectMinArea,
    setMaxArea,
    setMinArea,
} from "@/slices/filters";

import RangeSelect from "@/sections/Filters/Range";

import useRangeGenerator from "./useRangeGenerator";

const AreaSelect = () => {
    const { generateNumbers } = useRangeGenerator();
    return (
        <RangeSelect
            type="area"
            selectMin={selectMinArea}
            selectMax={selectMaxArea}
            setMin={setMinArea}
            setMax={setMaxArea}
            generateNumbers={generateNumbers}
        />
    );
};

export default AreaSelect;
