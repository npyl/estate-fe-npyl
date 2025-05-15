import { useTranslation } from "react-i18next";
import TabCounter from "../TabsCounter/TabCounter";

const OwnedPropertiesLabel = () => {
    const { t } = useTranslation();
    // const {} = useTabCounters():
    return <TabCounter label={t("Tasks")} count={0} />;
};

export default OwnedPropertiesLabel;
