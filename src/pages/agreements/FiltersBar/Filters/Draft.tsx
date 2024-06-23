import { useTranslation } from "react-i18next";
import { IOSSwitch } from "@/components/iOSSwitch";
import FilterToggleButton from "./styled";
import { useAgreementsFiltersContext } from "../FiltersContext";

export default function FilterDraft() {
    const { t } = useTranslation();
    const { filters, setFilter } = useAgreementsFiltersContext();

    return (
        <FilterToggleButton sx={{ minWidth: "130px" }}>
            {t("Draft")}
            <IOSSwitch
                value={filters.draft}
                onChange={(_, c) => setFilter("draft", c)}
            />
        </FilterToggleButton>
    );
}
