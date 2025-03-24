import {
    selectMaxPrice,
    selectMinPrice,
    setMaxPrice,
    setMinPrice,
} from "src/slices/customer/filters";

import RangeSelect from "@/sections/Filters/Range";

import usePriceRangeGenerator from "./usePriceGenerator";
import { useSelector } from "react-redux";

const PriceSelect = () => {
    const { generateNumbers } = usePriceRangeGenerator();

    const minPrice = useSelector(selectMinPrice);
    const maxPrice = useSelector(selectMaxPrice);

    return (
        <RangeSelect
            type="price"
            valueMin={minPrice}
            valueMax={maxPrice}
            setMin={setMinPrice}
            setMax={setMaxPrice}
            generateNumbers={generateNumbers}
        />
    );
};

export default PriceSelect;
