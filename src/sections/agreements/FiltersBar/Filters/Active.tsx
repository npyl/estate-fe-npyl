import { useTranslation } from "react-i18next";
import FilterToggle from "./FilterToggle";

const key = "active";

export default function FilterActive() {
    const { t } = useTranslation();
    return <FilterToggle label={t("_Active_")} filterKey={key} />;
}
