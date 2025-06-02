import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import FilterLabels from "./Labels";
import PriceSelect from "./Price";
import AreaSelect from "./Area";
import FilterManager from "./ManagedBy";
import FilterStatus from "./Status";
import ClearableSection from "@/components/Filters/ClearableSection";
import { dispatch } from "@/store";
import {
    setLabels,
    setManagerId,
    setMaxArea,
    setMaxPrice,
    setMinArea,
    setMinPrice,
    setStatus,
} from "@/slices/customer/filters";

const BasicFilters = () => {
    const { t } = useTranslation();
    const reset = () => {
        dispatch(setLabels(null));
        dispatch(setManagerId(null));
        dispatch(setStatus(null));
        dispatch(setMinPrice(undefined));
        dispatch(setMaxPrice(undefined));
        dispatch(setMinArea(undefined));
        dispatch(setMaxArea(undefined));
    };
    return (
        <ClearableSection title={t("Basic")} reset={reset}>
            <Box display={"flex"} gap={1} pt={1}>
                <FilterLabels />
                <PriceSelect />
                <AreaSelect />
                <FilterManager />
                <FilterStatus />
            </Box>
        </ClearableSection>
    );
};

export default BasicFilters;
