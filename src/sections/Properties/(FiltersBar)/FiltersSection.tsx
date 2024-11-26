// Filters
import FilterParentCategory from "./Filters/ParentCategory";
import FilterCategory from "./Filters/Category";
import FilterLabels from "./Filters/Labels";
import SaleSelect from "./Filters/Sale";
import ActiveSelect from "./Filters/ActiveSelect";
import Location from "./Filters/Location";
import PriceSelect from "./Filters/Price";
import AreaSelect from "./Filters/Area";

import LocationSearch from "./Filters/LocationSearch";

const FilterSection = () => (
    <>
        <LocationSearch />
        <SaleSelect />
        <FilterParentCategory />
        <FilterCategory />
        <PriceSelect />
        <AreaSelect />
        <FilterLabels />
        <ActiveSelect />
        <Location />
    </>
);

export default FilterSection;
