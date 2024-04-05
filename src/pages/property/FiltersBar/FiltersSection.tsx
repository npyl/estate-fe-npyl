import TuneIcon from "@mui/icons-material/Tune";
import { Badge, Stack } from "@mui/material";
import { useDispatch, useSelector } from "src/store";
// Filters
import FilterParentCategory from "./Filters/ParentCategory";
import FilterCategory from "./Filters/Category";
import FilterLabels from "./Filters/Labels";
import FilterMore from "./Filters/FilterMore";
import PriceSelect from "./Filters/Price";
import SaleSelect from "./Filters/Sale";

import { StyledPriceButton } from "@/components/Filters";

import {
    selectLabels,
    setLabels,
    sumOfChangedProperties,
    resetState,
} from "src/slices/filters";

import useDialog from "@/hooks/useDialog";
import useResponsive from "@/hooks/useResponsive";

const FilterSection = () => {
    const dispatch = useDispatch();

    const changedPropertyFilters = useSelector(sumOfChangedProperties);
    const labels = useSelector(selectLabels) || [];

    const handleResetFilter = () => {
        dispatch(resetState());
    };

    const [isDialogOpen, openDialog, closeDialog] = useDialog();

    const belowSm = useResponsive("down", "sm");

    return (
        <>
            <Stack direction={"row"} minWidth={"350px"} flex={1} spacing={1}>
                {belowSm ? null : (
                    <>
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
                            <Badge
                                badgeContent={changedPropertyFilters}
                                color="error"
                            >
                                <TuneIcon />
                            </Badge>
                        </StyledPriceButton>
                    </>
                )}

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

export default FilterSection;
