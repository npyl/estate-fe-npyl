import React, { useMemo } from "react";
import { PaperProps, Stack } from "@mui/material";
import {
    resetState,
    sumOfChangedProperties,
} from "src/slices/customer/filters";
// filters
import FilterStatus from "./Filters/Status";
import FilterBuyerLeaserAndMore from "./Filters/BuyerLeaserAndMore";
import FilterCategory from "./Filters/Category";
import FilterParentCategory from "./Filters/ParentCategory";
import ChosenFilters from "./Filters/ChosenFilters";
import FilterManager from "./Filters/ManagedBy";
import FilterMoreButton from "@/components/Filters/FilterMore/Button";
import FilterLabels from "./Filters/Labels";
import useDialog from "@/hooks/useDialog";
import { getOptions } from "./constants";
import { useTranslation } from "react-i18next";
import { useSelector } from "src/store";
import useResponsive from "@/hooks/useResponsive";
import dynamic from "next/dynamic";
import FiltersBar from "@/components/Filters/FiltersBar";
import FilterSortBy from "@/components/Filters/SortBy";
import { useDispatch } from "react-redux";
import PriceSelect from "./Filters/Price";
import AreaSelect from "./Filters/Area";
const FilterMore = dynamic(
    () => import("@/components/Filters/FilterMore/Dialog")
);

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
    const handleResetAll = () => dispatch(resetState());

    const changedCustomerFilters = useSelector(sumOfChangedProperties);

    const [isDialogOpen, openDialog, closeDialog] = useDialog();

    const filterContent = (
        <>
            <FilterBuyerLeaserAndMore />
            <FilterParentCategory />
            <FilterCategory />
            <FilterLabels />
            <PriceSelect />
            <AreaSelect />
            <FilterManager />
        </>
    );

    const belowLg = useResponsive("down", "lg");

    const options = useMemo(() => getOptions(t), [t]);

    return (
        <>
            <FiltersBar
                {...props}
                filters={
                    <>
                        {belowLg ? null : filterContent}

                        <FilterMoreButton
                            changedFiltersCount={changedCustomerFilters}
                            onClick={openDialog}
                        />
                    </>
                }
                bottomContent={
                    changedCustomerFilters > 0 ? <ChosenFilters /> : null
                }
                controls={
                    <FilterSortBy
                        options={options}
                        sorting={sorting}
                        onSortingChange={onSortingChange}
                    />
                }
            />

            {isDialogOpen ? (
                <FilterMore
                    open
                    onClose={closeDialog}
                    onResetFilter={handleResetAll}
                >
                    <Stack width={1} spacing={1} px={6} mt={1}>
                        {filterContent}
                        <FilterStatus />
                    </Stack>
                </FilterMore>
            ) : null}
        </>
    );
};
