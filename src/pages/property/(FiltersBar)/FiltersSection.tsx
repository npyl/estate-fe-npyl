// Filters
import FilterParentCategory from "./Filters/ParentCategory";
import FilterCategory from "./Filters/Category";
import FilterLabels from "./Filters/Labels";
import PriceSelect from "./Filters/Price";
import SaleSelect from "./Filters/Sale";

import ActiveSelect from "./Filters/ActiveSelect";

const FilterSection = () => (
    <>
        <SaleSelect />
        <FilterParentCategory />
        <FilterCategory />
        <PriceSelect type={"price"} />
        <PriceSelect type={"area"} />
        <FilterLabels />
        <ActiveSelect />
    </>
);

export default FilterSection;
