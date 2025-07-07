import RangeSelect from "@/ui/Filters/Range";
import usePriceRangeGenerator from "./usePriceRangeGenerator";
import {
    useFiltersContext,
    useMaxPrice,
    useMinPrice,
} from "@/sections/Properties/FiltersContext";

const PriceSelect = () => {
    const { generateNumbers } = usePriceRangeGenerator();

    const minPrice = useMinPrice();
    const maxPrice = useMaxPrice();
    const { setMinPrice, setMaxPrice } = useFiltersContext();

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
