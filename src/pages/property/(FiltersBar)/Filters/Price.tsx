import {
    selectMaxPrice,
    selectMinPrice,
    setMaxPrice,
    setMinPrice,
} from "@/slices/filters";

import RangeSelect from "@/sections/Filters/Range";

import useRangeGenerator from "./useRangeGenerator";

const PriceSelect = () => {
    const { generateNumbers } = useRangeGenerator();
    return (
        <RangeSelect
            type="price"
            selectMin={selectMinPrice}
            selectMax={selectMaxPrice}
            setMin={setMinPrice}
            setMax={setMaxPrice}
            generateNumbers={generateNumbers}
        />
    );
};

export default PriceSelect;
