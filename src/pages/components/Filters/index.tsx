import TuneIcon from "@mui/icons-material/Tune";
import { Badge, Stack } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "src/store";

// import CountrySelect from "./FilterCities";
// import SubAreas from "./FilterSubAreas";
import FilterParentCategory from "./FilterParentCategory";
import FilterCategory from "./FilterCategory";
import FilterLabels from "./FilterLabels";
import FilterMore from "./FilterMore";
import PriceSelect from "./FilterPrice";
import SaleSelect from "./FilterSale";
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
            <Stack direction={"row"} minWidth={"350px"} flex={1} spacing={1}>
                <SaleSelect />
                <FilterParentCategory />
                <FilterCategory />

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
