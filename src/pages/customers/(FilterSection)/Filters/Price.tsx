import {
    selectMaxPrice,
    selectMinPrice,
    setMaxPrice,
    setMinPrice,
} from "src/slices/customer/filters";

import RangeSelect from "@/sections/Filters/Range";
import rangeGenerator from "./rangeGenerator";

const PriceSelect = () => (
    <RangeSelect
        type="price"
        selectMin={selectMinPrice}
        selectMax={selectMaxPrice}
        setMin={setMinPrice}
        setMax={setMaxPrice}
        generateNumbers={rangeGenerator}
    />
);

export default PriceSelect;
