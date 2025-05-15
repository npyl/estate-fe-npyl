import { useGetTabCountQuery } from "@/services/properties";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import PropertyTabCounter from "../TabCounter";

const TasksLabel = () => {
    const { t } = useTranslation();

    const router = useRouter();
    const { propertyId } = router.query;

    const { data: tabCounts } = useGetTabCountQuery(+propertyId!, {
        skip: !propertyId,
    });

    return (
        <PropertyTabCounter label={t("Tasks")} count={tabCounts?.tasks ?? 0} />
    );
};

export default TasksLabel;
