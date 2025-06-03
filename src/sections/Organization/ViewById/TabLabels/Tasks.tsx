import { useTranslation } from "react-i18next";
import TabCounter from "@/ui/TabCounter";
import useOrganizationTabCounts from "../../useOrganizationTabCounts";

const TasksLabel = () => {
    const { t } = useTranslation();
    const { data } = useOrganizationTabCounts();
    return <TabCounter label={t("Tasks")} count={data?.tasks ?? 0} />;
};

export default TasksLabel;
