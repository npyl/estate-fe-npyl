import { useTranslation } from "react-i18next";
import TabCounter from "@/sections/TabCounter";
import { useRouter } from "next/router";
import { useTabCountQuery } from "@/services/customers";

const TasksLabel = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const { customerId } = router.query;
    const { data } = useTabCountQuery(+customerId!);
    return <TabCounter label={t("Tasks")} count={data?.tasks ?? 0} />;
};

export default TasksLabel;
