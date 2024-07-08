import { useTranslation } from "react-i18next";
import { FilterBox, FilterButtonGroup } from "./styled";
import { useAgreementsFiltersContext } from "../FiltersContext";
import ToggleButton from "@mui/material/ToggleButton";
import React from "react";
import { IAgreementsFilters } from "@/types/agreements";

interface FilterToggleProps {
    label: string;
    filterKey: keyof IAgreementsFilters;
}

const FilterToggle: React.FC<FilterToggleProps> = ({ label, filterKey }) => {
    const { t } = useTranslation();

    const { filters, setFilter, clearFilter } = useAgreementsFiltersContext();

    const value = filters[filterKey] === null ? "ALL" : filters[filterKey];
    const clear = () => clearFilter(filterKey);
    const enable = () => setFilter(filterKey, true);
    const disable = () => setFilter(filterKey, false);

    return (
        <FilterBox>
            {label}

            <FilterButtonGroup value={value} size="small">
                <ToggleButton value="ALL" onClick={clear}>
                    -
                </ToggleButton>
                <ToggleButton value={true} onClick={enable}>
                    {t("YES")}
                </ToggleButton>
                <ToggleButton value={false} onClick={disable}>
                    {t("NO")}
                </ToggleButton>
            </FilterButtonGroup>
        </FilterBox>
    );
};

export default FilterToggle;
