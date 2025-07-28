import RangeSelect from "@/ui/Filters/Range";
import usePriceRangeGenerator from "./usePriceGenerator";
import { useFiltersContext, useMaxPrice, useMinPrice } from "../../Context";

const PriceSelect = () => {
    const { generateNumbers } = usePriceRangeGenerator();

    const { setMinPrice, setMaxPrice } = useFiltersContext();
    const minPrice = useMinPrice();
    const maxPrice = useMaxPrice();

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
