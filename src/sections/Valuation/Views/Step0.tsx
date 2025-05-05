import FilterParentCategory from "@/sections/Properties/(FiltersBar)/Filters/ParentCategory";
import FilterCategory from "@/sections/Properties/(FiltersBar)/Filters/Category";
import SaleSelect from "@/sections/Properties/(FiltersBar)/Filters/Sale";

const Step0 = () => {
    return (
        <>
            <FilterParentCategory />
            <FilterCategory />
            <SaleSelect />
        </>
    );
};

export default Step0;
