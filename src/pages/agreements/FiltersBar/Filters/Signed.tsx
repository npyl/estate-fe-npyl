import { useTranslation } from "react-i18next";
import { IOSSwitch } from "@/components/iOSSwitch";
import FilterToggleButton from "./styled";
import { useAgreementsFiltersContext } from "../FiltersContext";

export default function FilterSigned() {
    const { t } = useTranslation();
    const { filters, setFilter } = useAgreementsFiltersContext();

    return (
        <FilterToggleButton sx={{ minWidth: "130px" }}>
            {t("Signed")}
            <IOSSwitch
                value={filters.signed}
                onChange={(_, b) => setFilter("signed", b)}
            />
        </FilterToggleButton>
    );
}
