import { useTranslation } from "react-i18next";
import TabCounter from "@/sections/TabCounter";
import { useTabCountQuery } from "@/services/customers";
import { useRouter } from "next/router";

const AgreementsLabel = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const { customerId } = router.query;
    const { data } = useTabCountQuery(+customerId!);
    return <TabCounter label={t("Agreements")} count={data?.agreements ?? 0} />;
};

export default AgreementsLabel;
