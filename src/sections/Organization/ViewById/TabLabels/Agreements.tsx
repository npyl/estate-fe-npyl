import { useTranslation } from "react-i18next";
import TabCounter from "@/ui/TabCounter";
import useOrganizationTabCounts from "../../useOrganizationTabCounts";

const AgreementsLabel = () => {
    const { t } = useTranslation();
    const { data } = useOrganizationTabCounts();
    return <TabCounter label={t("Agreements")} count={data?.agreements ?? 0} />;
};

export default AgreementsLabel;
