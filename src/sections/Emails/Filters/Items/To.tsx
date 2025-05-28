import { useFiltersContext } from "@/sections/Emails/Filters/Context";
import PeopleFilter from "./_People";
import { useTranslation } from "react-i18next";

const ToFilter = () => {
    const { t } = useTranslation();

    const { box } = useFiltersContext();
    if (box !== "SENT") return null;

    return <PeopleFilter label={t("To")} />;
};

export default ToFilter;
