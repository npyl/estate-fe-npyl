import { useTranslation } from "react-i18next";
import FilterToggle from "./FilterToggle";

const key = "keys";

export default function FilterActive() {
    const { t } = useTranslation();
    return <FilterToggle label={t("_keys_")} filterKey={key} />;
}
