import { useTranslation } from "react-i18next";
import { IOSSwitch } from "@/components/iOSSwitch";
import FilterToggleButton from "./styled";
import { useAgreementsFiltersContext } from "../FiltersContext";

export default function FilterActive() {
    const { t } = useTranslation();
    const { filters, setFilter } = useAgreementsFiltersContext();

    return (
        <FilterToggleButton sx={{ minWidth: "130px" }}>
            {t("Active")}
            <IOSSwitch
                value={filters.active}
                onChange={(_, c) => setFilter("active", c)}
            />
        </FilterToggleButton>
    );
}
