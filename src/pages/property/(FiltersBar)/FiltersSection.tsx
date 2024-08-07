import { useSelector } from "src/store";
// Filters
import FilterParentCategory from "./Filters/ParentCategory";
import FilterCategory from "./Filters/Category";
import FilterLabels from "./Filters/Labels";
import PriceSelect from "./Filters/Price";
import SaleSelect from "./Filters/Sale";

import { selectLabels, setLabels } from "src/slices/filters";
import ActiveSelect from "./Filters/ActiveSelect";

const FilterSection = () => {
    const labels = useSelector(selectLabels) || [];

    return (
        <>
            <SaleSelect />
            <FilterParentCategory />
            <FilterCategory />
            <PriceSelect type={"price"} />
            <PriceSelect type={"area"} />
            <FilterLabels
                variant="property"
                labels={labels}
                setLabels={setLabels}
            />
            <ActiveSelect />
        </>
    );
};

export default FilterSection;
