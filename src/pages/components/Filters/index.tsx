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
        <Grid item xs={12}>
            <Grid container xs={12}>
                {/* <CountrySelect /> */}
                {/* <SubAreas /> */}
                <Grid item xs={1.75}>
                    <SaleSelect />
                </Grid>
                <Grid item xs={1.75}>
                    <CategorySelect />
                </Grid>
                <Grid item xs={1.75}>
                    <SubCategorySelect />
                </Grid>
                <Grid item xs={1.75}>
                    <PriceSelect type={"price"} />
                </Grid>
                <Grid item xs={1.75}>
                    <PriceSelect type={"area"} />
                </Grid>
                <Grid item xs={1.75}>
                    <FilterLabels
                        variant="property"
                        labels={labels}
                        setLabels={setLabels}
                    />
                </Grid>
                <Grid item xs={1.5}>
                    <StyledPriceButton
                        open={false}
                        disableRipple
                        color="inherit"
                        onClick={handleOpenFilter}
                    >
                        <Badge
                            badgeContent={changedPropertyFilters}
                            color="error"
                        >
                            <TuneIcon />
                        </Badge>
                    </StyledPriceButton>
                </Grid>
                {changedPropertyFilters > 0 && (
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
            </Grid>
        </Grid>
    );
};
