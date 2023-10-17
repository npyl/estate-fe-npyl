import { Box, Paper, PaperProps, Stack } from "@mui/material";
import { useSelector } from "src/store";

import {
    setManagerId,
    selectLabels,
    setLabels,
    sumOfChangedProperties,
    selectManagerId,
} from "src/slices/customer/filters";
import FilterBuyerLeaserAndMore from "src/pages/customer/components/Filters/FilterBuyerLeaserAndMore";
import FilterParentCategory from "src/pages/components/Filters/FilterParentCategory";
import ChosenFilters from "src/pages/components/Filters/ChosenFilters";
import FilterCategory from "src/pages/components/Filters/FilterCategory";
import PriceSelect from "src/pages/components/Filters/FilterPrice";
import FilterManager from "src/pages/customer/components/Filters/FilterManagedBy";
import FilterStatus from "src/pages/customer/components/Filters/FilterStatus";
import FilterActions from "./Filters/FilterActions";

export const FilterLogSection: React.FC<PaperProps> = ({ ...props }) => {
    const changedCustomerFilters = useSelector(sumOfChangedProperties);
    const labels = useSelector(selectLabels) || [];
    const managers = useSelector(selectManagerId) || 0;

    return (
        <Stack spacing={1} component={Paper} p={1} mt={2} {...props}>
            <Stack flexWrap={"wrap"} direction={"row"} gap={1}>
                <FilterBuyerLeaserAndMore />
                <FilterParentCategory />
                <FilterCategory />
                <FilterActions></FilterActions>
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
