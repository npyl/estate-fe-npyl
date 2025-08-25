import React, { useMemo } from "react";
import { Box, PaperProps, Stack } from "@mui/material";
import FilterBuyerLeaserAndMore from "./Filters/BuyerLeaserAndMore";
import FilterCategory from "./Filters/Category";
import FilterParentCategory from "./Filters/ParentCategory";
import ChosenFilters from "./Filters/ChosenFilters";
import FilterManager from "./Filters/ManagedBy";
import FilterMoreButton from "@/ui/Filters/FilterMore/Button";
import FilterLabels from "./Filters/Labels";
import useDialog from "@/hooks/useDialog";
import { getOptions } from "./constants";
import { useTranslation } from "react-i18next";
import useResponsive from "@/hooks/useResponsive";
import dynamic from "next/dynamic";
import FiltersBar from "@/components/Filters/FiltersBar";
import FilterSortBy from "@/ui/Filters/SortBy";
import PriceSelect from "./Filters/Price";
import AreaSelect from "./Filters/Area";
import BasicFilters from "./Filters/BasicFilters";
import FilterBuyerLeaserAndMoreInMoreSection from "./Filters/BuyerLeaserAndMoreInMoreSection";
import ParentCategoryInMore from "./Filters/ParentCategoryInMore";
import FilterCategoryInMore from "./Filters/CategoryInMore";
import { useFiltersContext, useSumOfChangedProperties } from "./Context";
const FilterMore = dynamic(() => import("@/ui/Filters/FilterMore/Dialog"));

interface FilterSectionProps extends PaperProps {
    sorting: string;
}

export const FilterSection: React.FC<FilterSectionProps> = ({
    sorting,
    ...props
}) => {
    const { t } = useTranslation();

    const { resetState, setSorting } = useFiltersContext();

    const changedCustomerFilters = useSumOfChangedProperties();

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

    const filterMoreContent = (
        <Stack gap={1}>
            <Box width={"100%"} mb={1}>
                <ChosenFilters sx={{ flexWrap: "wrap", gap: 0.5 }} />
            </Box>
            <BasicFilters />
            <FilterBuyerLeaserAndMoreInMoreSection />
            <ParentCategoryInMore />
            <FilterCategoryInMore />
        </Stack>
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
                    changedCustomerFilters > 0 ? (
                        <ChosenFilters sx={{ flexWrap: "wrap", gap: 0.5 }} />
                    ) : null
                }
                controls={
                    <FilterSortBy
                        options={options}
                        sorting={sorting}
                        onSortingChange={setSorting}
                    />
                }
            />

            {isDialogOpen ? (
                <FilterMore
                    open
                    onClose={closeDialog}
                    onResetFilter={resetState}
                >
                    <Stack width={1} spacing={1} px={6} mt={1}>
                        {filterMoreContent}
                    </Stack>
                </FilterMore>
            ) : null}
        </>
    );
};
