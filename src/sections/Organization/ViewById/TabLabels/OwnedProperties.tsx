import { useTranslation } from "react-i18next";
import TabCounter from "@/ui/TabCounter";
import useOrganizationTabCounts from "../../useOrganizationTabCounts";

const OwnedPropertiesLabel = () => {
    const { t } = useTranslation();
    const { data } = useOrganizationTabCounts();
    return (
        <TabCounter
            label={t("Owned Properties")}
            count={data?.ownedProperties ?? 0}
        />
    );
};

export default OwnedPropertiesLabel;
