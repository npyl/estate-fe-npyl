import {
    selectMaxArea,
    selectMinArea,
    setMaxArea,
    setMinArea,
} from "src/slices/customer/filters";

import RangeSelect from "@/sections/Filters/Range";

import areaRangeGenerator from "@/sections/Filters/areaRangeGenerator";
import { useSelector } from "react-redux";
import { useCallback } from "react";
import { dispatch } from "@/store";

const AreaSelect = () => {
    const minArea = useSelector(selectMinArea);
    const maxArea = useSelector(selectMaxArea);

    const onSetMinArea = useCallback(
        (v?: number) => dispatch(setMinArea(v)),
        []
    );
    const onSetMaxAre = useCallback(
        (v?: number) => dispatch(setMaxArea(v)),
        []
    );
    return (
        <RangeSelect
            type="area"
            valueMin={minArea}
            valueMax={maxArea}
            setMin={onSetMinArea}
            setMax={onSetMaxAre}
            generateNumbers={areaRangeGenerator}
        />
    );
};

export default AreaSelect;
