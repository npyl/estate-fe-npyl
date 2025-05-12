import { useTranslation } from "react-i18next";
import { useFiltersContext } from "@/sections/Emails/Filters/Context";
import ChipLabel from "@/sections/Filters/ChipLabel";

const FromLabel = () => {
    const { t } = useTranslation();
    const { filters } = useFiltersContext();
    const { from } = filters;
    return <ChipLabel title={t("From")} value={from} />;
};

export default FromLabel;
