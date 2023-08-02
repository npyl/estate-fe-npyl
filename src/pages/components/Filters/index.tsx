import TuneIcon from "@mui/icons-material/Tune";
import { Badge, Box, Grid, Paper, Stack } from "@mui/material";
import { useState } from "react";
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
    selectLabels,
    setLabels,
    sumOfChangedProperties,
    resetState,
} from "src/slices/filters";

export const FilterSection = () => {
    const dispatch = useDispatch();

    const [openFilter, setOpenFilter] = useState(false);

    const changedPropertyFilters = useSelector(sumOfChangedProperties);
    const labels = useSelector(selectLabels) || [];

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

    return (
        <>
            <Stack direction={"row"} minWidth={"350px"} pr={2}>
                <SaleSelect />
                <CategorySelect />
                <SubCategorySelect />
            </Stack>
            <Stack direction={"row"} flex={1}>
                <PriceSelect type={"price"} />
                <PriceSelect type={"area"} />
                <FilterLabels
                    variant="property"
                    labels={labels}
                    setLabels={setLabels}
                />
                <StyledPriceButton
                    open={false}
                    disableRipple
                    color="inherit"
                    onClick={handleOpenFilter}
                >
                    <Badge badgeContent={changedPropertyFilters} color="error">
                        <TuneIcon />
                    </Badge>
                </StyledPriceButton>
                {/* {changedPropertyFilters > 0 && (
                    <Box overflow={"auto"}>
                        <ChosenFilters />
                    </Box>
                )} */}
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
        </>
    );
};
