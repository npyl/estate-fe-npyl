import { useTranslation } from "react-i18next";
import TabCounter from "@/ui/TabCounter";
import useOrganizationTabCounts from "../../useOrganizationTabCounts";

const MatchingPropertiesLabel = () => {
    const { t } = useTranslation();
    const { data } = useOrganizationTabCounts();
    return (
        <TabCounter
            label={t("Matching Properties")}
            count={data?.matchingProperties ?? 0}
        />
    );
};

export default MatchingPropertiesLabel;
