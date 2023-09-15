import { Box, Paper, PaperProps, Stack } from "@mui/material";
import { useSelector } from "src/store";
import ChosenFilters from "./ChosenFilters";
import FilterLabels from "src/pages/components/Filters/FilterLabels";

import {
    selectLabels,
    setLabels,
    sumOfChangedProperties,
} from "src/slices/customer/filters";
import FilterStatus from "./FilterStatus";
import FilterBuyerLeaserAndMore from "src/pages/components/Filters/FilterBuyerLeaserAndMore";
import CategoryForCustomerSelect from "src/pages/components/Filters/FilterCategoryForCustomer";
import SubCategoryForCustomerSelect from "src/pages/components/Filters/FilterSubCategoryForCustomer";

export const FilterSection: React.FC<PaperProps> = ({ ...props }) => {
    const changedCustomerFilters = useSelector(sumOfChangedProperties);
    const labels = useSelector(selectLabels) || [];

    return (
        <Stack spacing={3} component={Paper} p={1} mt={2} {...props}>
            <Stack flexWrap={"wrap"} direction={"row"} gap={1}>
                <FilterBuyerLeaserAndMore
                    variant={"property"}
                    setRoles={undefined}
                ></FilterBuyerLeaserAndMore>
                <CategoryForCustomerSelect></CategoryForCustomerSelect>
                <SubCategoryForCustomerSelect></SubCategoryForCustomerSelect>
                <FilterLabels
                    variant="customer"
                    labels={labels}
                    setLabels={setLabels}
                />

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
