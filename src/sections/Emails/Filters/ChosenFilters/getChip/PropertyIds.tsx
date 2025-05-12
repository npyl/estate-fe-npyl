import { useFiltersContext } from "@/sections/Emails/Filters/Context";
import ChipLabel from "@/sections/Filters/ChipLabel";
import { useTranslation } from "react-i18next";

const PropertyIdsLabel = () => {
    const { t } = useTranslation();
    const { filters } = useFiltersContext();
    const { propertyIds } = filters;
    const label = propertyIds.join(", ");
    return <ChipLabel title={t("Property")} value={label} />;
};

export default PropertyIdsLabel;
