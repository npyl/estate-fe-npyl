import FilterParentCategory from "@/sections/Properties/(FiltersBar)/Filters/ParentCategory";
import FilterCategory from "@/sections/Properties/(FiltersBar)/Filters/Category";
import SaleSelect from "@/sections/Properties/(FiltersBar)/Filters/Sale";
import Stack from "@mui/material/Stack";

const Step0 = () => (
    <Stack
        direction="row"
        spacing={1}
        justifyContent="center"
        alignItems="center"
        width={1}
    >
        <FilterParentCategory />
        <FilterCategory />
        <SaleSelect />
    </Stack>
);

export default Step0;
