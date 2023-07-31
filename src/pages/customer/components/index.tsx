import { Box, Paper, Stack } from "@mui/material";
import { useSelector } from "src/store";
import ChosenFilters from "./ChosenFilters";
import FilterLabels from "src/pages/components/Filters/FilterLabels";

import {
    selectLabels,
    setLabels,
    sumOfChangedProperties,
} from "src/slices/customer/filters";
import FilterStatus from "./FilterStatus";

export const FilterSection = () => {
    const changedCustomerFilters = useSelector(sumOfChangedProperties);
    const labels = useSelector(selectLabels) || [];

    return (
        <Stack spacing={3} component={Paper} p={2} mt={2}>
            <Stack flexWrap={"wrap"} direction={"row"} spacing={1}>
                <FilterStatus />

                <FilterLabels
                    variant="customer"
                    labels={labels}
                    setLabels={setLabels}
                />
            </Stack>
            {changedCustomerFilters > 0 && (
                <Box overflow={"auto"}>
                    <ChosenFilters />
                </Box>
            )}
        </Stack>
    );
};
