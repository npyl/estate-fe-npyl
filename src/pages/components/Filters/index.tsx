import TuneIcon from "@mui/icons-material/Tune";
import { Badge, Box, Paper, Stack } from "@mui/material";
import { useState } from "react";
import sumOfChangedProperties, { resetState } from "src/slices/filters";
import { useDispatch, useSelector } from "src/store";
import ChosenFilters from "./ChosenFilters";
import CategorySelect from "./FilterCategory";
// import CountrySelect from "./FilterCities";
import FilterLabels from "./FilterLabels";
import FilterMore from "./FilterMore";
import PriceSelect from "./FilterPrice";
import SaleSelect from "./FilterSale";
// import SubAreas from "./FilterSubAreas";
import SubCategorySelect from "./FilterSubCategory";
import { StyledPriceButton } from "./styles";

import {
    selectLabels as selectPropertyLabels,
    setLabels as setPropertyLabels,
} from "src/slices/filters";
import {
    selectLabels as selectCustomerLabels,
    setLabels as setCustomerLabels,
} from "src/slices/customer/filters";

interface FilterSectionProps {
    variant?: string;
}

export const FilterSection = (props: FilterSectionProps) => {
    const { variant = "property" } = props;

    const dispatch = useDispatch();

    const changedPropsCount = useSelector(sumOfChangedProperties);
    const [openFilter, setOpenFilter] = useState(false);

    const propertyLabels = useSelector(selectPropertyLabels) || [];
    const customerLabels = useSelector(selectCustomerLabels) || [];

    const handleResetFilter = () => {
        dispatch(resetState());
    };

    const handleOpenFilter = () => {
        setOpenFilter(true);
    };

    const handleApplyFilter = () => {
        // setFilter(changedProps);
    };

    const handleCloseFilter = () => {
        setOpenFilter(false);
    };

    return variant === "property" ? (
        <Stack spacing={3} component={Paper} p={2}>
            <Stack flexWrap={"wrap"} direction={"row"} spacing={1}>
                {/* <CountrySelect /> */}
                {/* <SubAreas /> */}
                <SaleSelect />

                <CategorySelect />
                <SubCategorySelect />

                <PriceSelect type={"price"} />
                <PriceSelect type={"area"} />

                <FilterLabels
                    variant="property"
                    labels={propertyLabels}
                    setLabels={setPropertyLabels}
                />

                <StyledPriceButton
                    open={false}
                    disableRipple
                    color="inherit"
                    sx={{ width: "auto" }}
                    onClick={handleOpenFilter}
                >
                    <Badge badgeContent={changedPropsCount} color="error">
                        <TuneIcon />
                    </Badge>
                </StyledPriceButton>
            </Stack>
            {changedPropsCount > 0 && (
                <Box overflow={"auto"}>
                    <ChosenFilters />
                </Box>
            )}
            {openFilter && (
                <FilterMore
                    open={openFilter}
                    onOpen={handleOpenFilter}
                    onApply={handleApplyFilter}
                    onClose={handleCloseFilter}
                    onResetFilter={handleResetFilter}
                />
            )}
        </Stack>
    ) : (
        <Stack spacing={3} component={Paper} p={2} mt={2}>
            <Stack flexWrap={"wrap"} direction={"row"} spacing={1}>
                <FilterLabels
                    variant="customer"
                    labels={customerLabels}
                    setLabels={setCustomerLabels}
                />
            </Stack>
            {changedPropsCount > 0 && (
                <Box overflow={"auto"}>
                    <ChosenFilters />
                </Box>
            )}
        </Stack>
    );
};
