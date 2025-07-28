import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import FilterLabels from "./Labels";
import PriceSelect from "./Price";
import AreaSelect from "./Area";
import FilterManager from "./ManagedBy";
import FilterStatus from "./Status";
import ClearableSection from "@/components/Filters/ClearableSection";
import { useFiltersContext } from "../Context";

const BasicFilters = () => {
    const {
        setLabels,
        setManagerId,
        setStatus,
        setMinPrice,
        setMaxPrice,
        setMinArea,
        setMaxArea,
    } = useFiltersContext();
    const { t } = useTranslation();
    const reset = () => {
        setLabels([]);
        setManagerId(undefined);
        setStatus(undefined);
        setMinPrice(undefined);
        setMaxPrice(undefined);
        setMinArea(undefined);
        setMaxArea(undefined);
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
