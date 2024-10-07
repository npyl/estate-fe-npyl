// Filters
import FilterParentCategory from "./Filters/ParentCategory";
import FilterCategory from "./Filters/Category";
import FilterLabels from "./Filters/Labels";
import RangeSelect from "./Filters/Range";
import SaleSelect from "./Filters/Sale";
import ActiveSelect from "./Filters/ActiveSelect";
import Location from "./Filters/Location";

const FilterSection = () => (
    <>
        <SaleSelect />
        <FilterParentCategory />
        <FilterCategory />
        <RangeSelect type="price" />
        <RangeSelect type="area" />
        <FilterLabels />
        <ActiveSelect />
        <Location />
    </>
);

export default FilterSection;
