import TuneIcon from "@mui/icons-material/Tune";
import { Badge, Stack } from "@mui/material";
import { useDispatch, useSelector } from "src/store";
// Filters
import FilterParentCategory from "./FilterParentCategory";
import FilterCategory from "./FilterCategory";
import FilterLabels from "./FilterLabels";
import FilterMore from "./FilterMore";
import PriceSelect from "./FilterPrice";
import SaleSelect from "./FilterSale";

import { StyledPriceButton } from "@/components/Filters";

import {
    selectLabels,
    setLabels,
    sumOfChangedProperties,
    resetState,
} from "src/slices/filters";

import useDialog from "@/hooks/useDialog";

export const FilterSection = () => {
    const dispatch = useDispatch();

    const changedPropertyFilters = useSelector(sumOfChangedProperties);
    const labels = useSelector(selectLabels) || [];

    const handleResetFilter = () => {
        dispatch(resetState());
    };

    const [isDialogOpen, openDialog, closeDialog] = useDialog();

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
                    onClick={openDialog}
                >
                    <Badge badgeContent={changedPropertyFilters} color="error">
                        <TuneIcon />
                    </Badge>
                </StyledPriceButton>

                {isDialogOpen ? (
                    <FilterMore
                        open={isDialogOpen}
                        onOpen={openDialog}
                        onClose={closeDialog}
                        onResetFilter={handleResetFilter}
                    />
                ) : null}
            </Stack>
        </>
    );
};
