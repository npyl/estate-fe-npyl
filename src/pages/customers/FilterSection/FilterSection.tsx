import { Box, Paper, PaperProps, Stack } from "@mui/material";
import { useSelector } from "src/store";

import {
    selectLabels,
    setLabels,
    sumOfChangedProperties,
} from "src/slices/customer/filters";

import FilterStatus from "./Filters/Status";
import FilterBuyerLeaserAndMore from "./Filters/BuyerLeaserAndMore";
import FilterCategory from "./Filters/Category";
import FilterParentCategory from "./Filters/ParentCategory";
import FilterLabels from "@/pages/property/FiltersBar/Filters/Labels";
import ChosenFilters from "./Filters/ChosenFilters";
import PriceSelect from "./Filters/Price";
import FilterManager from "./Filters/ManagedBy";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";
import FilterMore from "@/components/Filters/FilterMore/Dialog";
import FloatingButton from "@/components/Filters/FilterMore/FloatingButton";

export const FilterSection: React.FC<PaperProps> = ({ ...props }) => {
    const changedCustomerFilters = useSelector(sumOfChangedProperties);
    const labels = useSelector(selectLabels) || [];

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const [open, setOpen] = React.useState(false);

    const filterContent = (
        <>
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
        </>
    );

    return isMobile ? (
        <>
            <FilterMore
                open={open}
                onClose={() => setOpen(false)}
                changedFiltersCount={changedCustomerFilters}
                onResetFilter={() => {}}
            >
                {filterContent}
            </FilterMore>
            <FloatingButton
                badgeContent={changedCustomerFilters}
                onClick={() => setOpen(true)}
            />
        </>
    ) : (
        <Stack spacing={1} component={Paper} p={1} mt={1} {...props}>
            {filterContent}
        </Stack>
    );
};
