import { useTranslation } from "react-i18next";
import FilterToggle from "./FilterToggle";

const key = "draft";

export default function FilterActive() {
    const { t } = useTranslation();
    return <FilterToggle label={t("Draft")} filterKey={key} />;
}
