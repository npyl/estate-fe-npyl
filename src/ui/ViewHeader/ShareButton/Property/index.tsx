import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useGetPropertyListingsQuery } from "@/services/properties";
import DisabledShareButton from "./DisabledShareButton";
import EnabledShareButton from "./EnabledShareButton";

interface Props {
    propertyId: number;
}

const PropertyShareButton: FC<Props> = ({ propertyId }) => {
    const { t } = useTranslation();

    const { data: listings } = useGetPropertyListingsQuery(propertyId);

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

export default PropertyShareButton;
