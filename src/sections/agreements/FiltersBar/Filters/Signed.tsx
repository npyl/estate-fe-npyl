import { useTranslation } from "react-i18next";
import FilterToggle from "./FilterToggle";

const key = "signed";

export default function FilterActive() {
    const { t } = useTranslation();
    return <FilterToggle label={t("_signed_")} filterKey={key} />;
}
