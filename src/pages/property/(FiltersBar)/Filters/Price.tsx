import {
    selectMaxPrice,
    selectMinPrice,
    setMaxPrice,
    setMinPrice,
} from "@/slices/filters";

import RangeSelect from "@/sections/Filters/Range";

const PriceSelect = () => (
    <RangeSelect
        type="price"
        selectMin={selectMinPrice}
        selectMax={selectMaxPrice}
        setMin={setMinPrice}
        setMax={setMaxPrice}
    />
);

export default PriceSelect;
