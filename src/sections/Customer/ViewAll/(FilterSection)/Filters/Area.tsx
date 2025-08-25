import RangeSelect from "@/ui/Filters/Range";
import { useFiltersContext, useMinArea, useMaxArea } from "../Context";
import areaRangeGenerator from "@/ui/Filters/areaRangeGenerator";

const AreaSelect = () => {
    const { setMinArea, setMaxArea } = useFiltersContext();

    const minArea = useMinArea();
    const maxArea = useMaxArea();

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
