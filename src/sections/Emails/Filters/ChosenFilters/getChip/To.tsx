import { useFiltersContext } from "@/sections/Emails/Filters/Context";
import ChipLabel from "@/sections/Filters/ChipLabel";
import { useTranslation } from "react-i18next";

const ToLabel = () => {
    const { t } = useTranslation();
    const { filters } = useFiltersContext();
    const { to } = filters;
    return <ChipLabel title={t("To")} value={to || ""} />;
};

export default ToLabel;
