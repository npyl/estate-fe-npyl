import { useTranslation } from "react-i18next";
import TabCounter from "../TabsCounter/TabCounter";
import { useRouter } from "next/router";
import { useTabCountQuery } from "@/services/customers";

const MatchingPropertiesLabel = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const { customerId } = router.query;
    const { data } = useTabCountQuery(+customerId!);
    return (
        <TabCounter
            label={t("Matching Properties")}
            count={data?.matchingProperties ?? 0}
        />
    );
};

export default MatchingPropertiesLabel;
