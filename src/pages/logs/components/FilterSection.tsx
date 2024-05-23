import { Box, Stack } from "@mui/material";
import { useSelector } from "src/store";

import useResponsive from "src/hooks/useResponsive";
import { sumOfChangedProperties } from "src/slices/log";
import ChosenFiltersLogs from "./Filters/ChoosenFiltersLogs";
import FilterActions from "./Filters/FilterActions";
import DateSelect from "./Filters/FilterDate";
import FilterLogManager from "./Filters/FilterManagers";
import FilterResources from "./Filters/FilterResources";

export const FilterLogSection = () => {
    const changedCustomerFilters = useSelector(sumOfChangedProperties);
    const isMobile = useResponsive("down", 500);

    return (
        <>
            <Stack
                flexWrap={"wrap"}
                direction={isMobile ? "column" : "row"}
                gap={1}
                alignItems={"center"}
            >
                <FilterActions />
                <FilterResources />
                <DateSelect />
                <FilterLogManager />
            </Stack>
            {changedCustomerFilters > 0 && (
                <Box overflow={"auto"}>
                    <ChosenFiltersLogs />
                </Box>
            )}
        </>
    );
};
