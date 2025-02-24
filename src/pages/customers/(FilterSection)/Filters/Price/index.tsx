import {
    selectMaxPrice,
    selectMinPrice,
    setMaxPrice,
    setMinPrice,
} from "src/slices/customer/filters";

import RangeSelect from "@/sections/Filters/Range";

import usePriceRangeGenerator from "./usePriceGenerator";

const PriceSelect = () => {
    const { generateNumbers } = usePriceRangeGenerator();
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
