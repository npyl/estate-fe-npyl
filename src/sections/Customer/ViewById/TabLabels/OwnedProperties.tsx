import { useTranslation } from "react-i18next";
import TabCounter from "@/sections/TabCounter";
import { useRouter } from "next/router";
import { useTabCountQuery } from "@/services/customers";

const OwnedPropertiesLabel = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const { customerId } = router.query;
    const { data } = useTabCountQuery(+customerId!);
    return (
        <TabCounter
            label={t("Owned Properties")}
            count={data?.ownedProperties ?? 0}
        />
    );
};

export default OwnedPropertiesLabel;
