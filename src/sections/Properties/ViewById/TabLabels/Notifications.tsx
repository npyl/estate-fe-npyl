import { useGetTabCountQuery } from "@/services/properties";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import PropertyTabCounter from "../TabCounter";

const NotificationsLabel = () => {
    const { t } = useTranslation();

    const router = useRouter();
    const { propertyId } = router.query;

    const { data: tabCounts } = useGetTabCountQuery(+propertyId!, {
        skip: !propertyId,
    });

    return (
        <PropertyTabCounter
            label={t("Notifications")}
            count={tabCounts?.notifications ?? 0}
        />
    );
};

export default NotificationsLabel;
