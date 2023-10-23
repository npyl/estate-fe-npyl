import { Box, Paper, PaperProps, Stack } from "@mui/material";
import { useSelector } from "src/store";

import { sumOfChangedProperties } from "src/slices/log";
import FilterBuyerLeaserAndMore from "src/pages/customer/components/Filters/FilterBuyerLeaserAndMore";
import FilterParentCategory from "src/pages/components/Filters/FilterParentCategory";
import ChosenFilters from "src/pages/components/Filters/ChosenFilters";
import FilterCategory from "src/pages/components/Filters/FilterCategory";
import PriceSelect from "src/pages/components/Filters/FilterPrice";
import FilterManager from "src/pages/customer/components/Filters/FilterManagedBy";
import FilterStatus from "src/pages/customer/components/Filters/FilterStatus";
import FilterActions from "./Filters/FilterActions";
import FilterResources from "./Filters/FilterResources";
import DateSelect from "./Filters/FilterDate";
import ChosenFiltersLogs from "./Filters/ChoosenFiltersLogs";
import FilterLogManager from "./Filters/FilterManagers";

export const FilterLogSection: React.FC<PaperProps> = ({ ...props }) => {
    const changedCustomerFilters = useSelector(sumOfChangedProperties);

    return (
        <Stack spacing={1} component={Paper} p={1} mt={1} {...props}>
            <Stack flexWrap={"wrap"} direction={"row"} gap={1}>
                <FilterActions></FilterActions>
                <FilterResources />
                <DateSelect />
                <FilterLogManager />
            </Stack>
            {changedCustomerFilters > 0 && (
                <Box overflow={"auto"}>
                    {" "}
                    <ChosenFiltersLogs />{" "}
                </Box>
            )}
        </Stack>
    );
};
