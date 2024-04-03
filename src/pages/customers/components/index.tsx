import { Box, Paper, PaperProps, Stack } from "@mui/material";
import { useSelector } from "src/store";

import {
    selectLabels,
    setLabels,
    sumOfChangedProperties,
} from "src/slices/customer/filters";

import FilterStatus from "./Filters/FilterStatus";
import FilterBuyerLeaserAndMore from "./Filters/FilterBuyerLeaserAndMore";
import FilterCategory from "./Filters/FilterCategory";
import FilterParentCategory from "./Filters/FilterParentCategory";
import FilterLabels from "src/pages/components/Filters/FilterLabels";
import ChosenFilters from "./Filters/ChosenFilters";
import PriceSelect from "./Filters/FilterPrice";
import FilterManager from "./Filters/FilterManagedBy";

export const FilterSection: React.FC<PaperProps> = ({ ...props }) => {
    const changedCustomerFilters = useSelector(sumOfChangedProperties);
    const labels = useSelector(selectLabels) || [];

    return (
        <Stack spacing={1} component={Paper} p={1} mt={1} {...props}>
            <Stack flexWrap={"wrap"} direction={"row"} gap={1}>
                <FilterBuyerLeaserAndMore />
                <FilterParentCategory />
                <FilterCategory />
                <FilterLabels
                    variant="customer"
                    labels={labels}
                    setLabels={setLabels}
                />
                <PriceSelect type={"price"}></PriceSelect>
                <PriceSelect type={"area"}></PriceSelect>
                <FilterManager />
                <FilterStatus />
            </Stack>
            {changedCustomerFilters > 0 && (
                <Box overflow={"auto"}>
                    <ChosenFilters />
                </Box>
            )}
        </Stack>
    );
};
