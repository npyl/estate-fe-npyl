import { LoadingButton } from "@mui/lab";
import { useTranslation } from "react-i18next";
import usePropertyImages from "../../hook";
import { useSetIntegrationOrderedImagesMutation } from "@/services/integrations";
import { useRouter } from "next/router";
import React from "react";
import { TListingTab } from "../types";
import { IntegrationSite } from "@/types/listings";

interface Add20ButtonProps {
    tab: TListingTab;
}

const Add20Button: React.FC<Add20ButtonProps> = ({ tab }) => {
    const { t } = useTranslation();

    const router = useRouter();
    const { propertyId } = router.query;

    const [setImages] = useSetIntegrationOrderedImagesMutation();

    const { images } = usePropertyImages();

    const handleClick = () => {
        setImages({
            propertyId: +propertyId!,
            propertyImages: images.slice(0, 20).map(({ id }) => id),
            integrationSite: tab as IntegrationSite,
        });
    };

    return (
        <LoadingButton variant="contained" onClick={handleClick}>
            {t("Add first 20")}
        </LoadingButton>
    );
};

export default Add20Button;
