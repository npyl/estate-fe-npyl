import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { useGetPropertyListingsQuery } from "@/services/properties";
import DisabledShareButton from "./DisabledShareButton";
import EnabledShareButton from "./EnabledShareButton";

const ShareButton = () => {
    const { t } = useTranslation();

    const router = useRouter();
    const { propertyId } = router.query;
    const { data: listings } = useGetPropertyListingsQuery(+propertyId!);

    const hasPublic = useMemo(
        () => listings?.publicSites?.some(({ published }) => published),
        [listings?.publicSites]
    );

    return (
        <>
            {!hasPublic ? (
                <DisabledShareButton title={t("Property is not public")} />
            ) : null}

            {hasPublic ? <EnabledShareButton /> : null}
        </>
    );
};

export default ShareButton;
