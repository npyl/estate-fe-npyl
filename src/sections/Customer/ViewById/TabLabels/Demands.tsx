import { useTranslation } from "react-i18next";
import TabCounter from "../TabsCounter/TabCounter";

const DemandsLabel = () => {
    const { t } = useTranslation();
    // const {} = useTabCounters():
    return <TabCounter label={t("Demands")} count={0} />;
};

export default DemandsLabel;
