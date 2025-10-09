import { FC } from "react";
import { Box, Stack } from "@mui/material";
import ChosenFilters from "./Filters/ChosenFilters";
import BasicFilters from "./Filters/BasicFilters";
import FilterBuyerLeaserAndMoreInMoreSection from "./Filters/BuyerLeaserAndMoreInMoreSection";
import ParentCategoryInMore from "./Filters/ParentCategoryInMore";
import FilterCategoryInMore from "./Filters/CategoryInMore";
import { useFiltersContext } from "./Context";
import FilterMore from "@/ui/Filters/FilterMore/Dialog";

interface Props {
    onClose: VoidFunction;
}

const FilterMoreDialog: FC<Props> = ({ onClose }) => {
    const { resetState } = useFiltersContext();

    return (
        <FilterMore onClose={onClose} onResetFilter={resetState}>
            <Stack gap={1}>
                <Box width={"100%"} mb={1}>
                    <ChosenFilters sx={{ flexWrap: "wrap", gap: 0.5 }} />
                </Box>
                <BasicFilters />
                <FilterBuyerLeaserAndMoreInMoreSection />
                <ParentCategoryInMore />
                <FilterCategoryInMore />
            </Stack>
        </FilterMore>
    );
};

export default FilterMoreDialog;
