import { useTranslation } from "react-i18next";
import { IOSSwitch } from "@/components/iOSSwitch";
import FilterToggleButton from "./styled";
import { useAgreementsFiltersContext } from "../FiltersContext";

export default function FilterKeys() {
    const { t } = useTranslation();
    const { filters, setFilter } = useAgreementsFiltersContext();

    return (
        <FilterToggleButton sx={{ minWidth: "130px" }}>
            {t("Keys")}
            <IOSSwitch
                value={filters.keys}
                onChange={(_, b) => setFilter("keys", b)}
            />
        </FilterToggleButton>
    );
}
