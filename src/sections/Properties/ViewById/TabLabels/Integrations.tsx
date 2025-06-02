import { useGetTabCountQuery } from "@/services/properties";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import PropertyTabCounter from "../TabCounter";

const AgreementsLabel = () => {
    const { t } = useTranslation();

    const router = useRouter();
    const { propertyId } = router.query;

    const { data } = useGetTabCountQuery(+propertyId!, {
        skip: !propertyId,
    });

    const { integrations, publicListings } = data || {};
    const count = (integrations ?? 0) + (publicListings ?? 0);

    return <PropertyTabCounter label={t("Integrations")} count={count} />;
};

export default AgreementsLabel;
