import { useTranslation } from "react-i18next";
import FilterLabels from "./Labels";
import PriceSelect from "./Price";
import AreaSelect from "./Area";
import FilterManager from "./ManagedBy";
import FilterStatus from "./Status";
import ClearableSection from "@/components/Filters/ClearableSection";
import { useFiltersContext } from "../Context";
import { StackProps } from "@mui/material/Stack";
import { useCallback } from "react";

const ChildrenProps: StackProps = {
    flexWrap: "wrap",
    direction: "row",
    alignItems: "center",
    pt: 1,
    gap: 1,
};

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
    const reset = useCallback(() => {
        setLabels([]);
        setManagerId(undefined);
        setStatus(undefined);
        setMinPrice(undefined);
        setMaxPrice(undefined);
        setMinArea(undefined);
        setMaxArea(undefined);
    }, []);
    return (
        <ClearableSection
            title={t("Basic")}
            reset={reset}
            // ...
            ChildrenProps={ChildrenProps}
        >
            <FilterLabels />
            <PriceSelect />
            <AreaSelect />
            <FilterManager />
            <FilterStatus />
        </ClearableSection>
    );
};

export default BasicFilters;
