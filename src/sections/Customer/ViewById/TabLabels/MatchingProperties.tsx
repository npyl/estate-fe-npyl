import { useTranslation } from "react-i18next";
import TabCounter from "../TabsCounter/TabCounter";

const MatchingPropertiesLabel = () => {
    const { t } = useTranslation();
    // const {} = useTabCounters():
    return <TabCounter label={t("Tasks")} count={0} />;
};

export default MatchingPropertiesLabel;
