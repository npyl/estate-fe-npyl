import React, { useMemo } from "react";
import { ClickAwayListener, Paper, PaperProps, Stack } from "@mui/material";
import {
    selectLabels,
    setLabels,
    sumOfChangedProperties,
    resetState,
} from "src/slices/customer/filters";
// filters
import FilterStatus from "./Filters/Status";
import FilterBuyerLeaserAndMore from "./Filters/BuyerLeaserAndMore";
import FilterCategory from "./Filters/Category";
import FilterParentCategory from "./Filters/ParentCategory";
import ChosenFilters from "./Filters/ChosenFilters";
import PriceSelect from "./Filters/Price";
import FilterManager from "./Filters/ManagedBy";
import FilterMore from "@/components/Filters/FilterMore/Dialog";
import FilterMoreButton from "@/components/Filters/FilterMore/Button";
import FilterSortBy from "@/components/Filters/SortBy";
import FilterLabels from "@/pages/property/(FiltersBar)/Filters/Labels";
// ok
import useDialog from "@/hooks/useDialog";
import { SpaceBetween } from "@/components/styled";
import { getOptions } from "./constants";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "src/store";
import useResponsive from "@/hooks/useResponsive";

interface FilterSectionProps extends PaperProps {
    sorting: string;
    onSortingChange: (s: string) => void;
}

export const FilterSection: React.FC<FilterSectionProps> = ({
    sorting,
    onSortingChange,
    ...props
}) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const changedCustomerFilters = useSelector(sumOfChangedProperties);
    const labels = useSelector(selectLabels) || [];

    const [isDialogOpen, openDialog, closeDialog] = useDialog();

    const filterContent = (
        <>
            <FilterBuyerLeaserAndMore />
            <FilterParentCategory />
            <FilterCategory />
            <FilterLabels
                variant="customer"
                labels={labels}
                setLabels={setLabels}
            />

            <PriceSelect type={"price"} />
            <PriceSelect type={"area"} />

            <FilterManager />
        </>
    );

    const belowLg = useResponsive("down", "lg");

    const options = useMemo(() => getOptions(t), [t]);

    const clearAllSelectedFilters = () => {
        dispatch(resetState()); // Dispatch reset action to clear the filters
        dispatch(setLabels([]));
    };

    return (
        <>
            <Paper {...props}>
                <SpaceBetween pb={1} pl={1}>
                    <Stack
                        direction="row"
                        spacing={0.3}
                        overflow="auto hidden"
                        // INFO: paddings added in this container to allow badge to show up without overflow hacks
                        pt={1}
                        pb={0}
                    >
                        {belowLg ? null : filterContent}

                        <FilterMoreButton
                            onClick={openDialog}
                            changedFiltersCount={changedCustomerFilters}
                        />
                    </Stack>

                    <Stack direction="row" spacing={0.3} p={1} pb={0} pl={0.3}>
                        <FilterSortBy
                            options={options}
                            sorting={sorting}
                            onSortingChange={onSortingChange}
                        />
                    </Stack>
                </SpaceBetween>

                {changedCustomerFilters > 0 ? (
                    <ChosenFilters px={1} pb={1} />
                ) : null}
            </Paper>

            {isDialogOpen ? (
                <FilterMore
                    open={isDialogOpen}
                    onClose={closeDialog}
                    changedFiltersCount={changedCustomerFilters}
                    onResetFilter={clearAllSelectedFilters}
                >
                    {filterContent}
                    <FilterStatus />{" "}
                    {/* the status is only visible inside the dialog! */}
                </FilterMore>
            ) : null}
        </>
    );
};
