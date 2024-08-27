import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import React from "react";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { ResponsiveSoftButton } from "../../styled";
import { useIntegrationsOperations } from "../../../../context/IntegrationsOperations";
import { TListingTab } from "../../../types";
import { IntegrationSite } from "@/types/listings";

interface PublicButtonProps {
    tab: TListingTab;
    selectedImages: string[];
}

const PublicButton: React.FC<PublicButtonProps> = ({ tab, selectedImages }) => {
    const { t } = useTranslation();

    const router = useRouter();
    const { propertyId } = router.query;

    const { setOrderedImages, isLoading } = useIntegrationsOperations();

    const handleClick = () =>
        setOrderedImages({
            integrationSite: tab as IntegrationSite,
            propertyId: +propertyId!,
            propertyImages: [],
        });

    return (
        <ResponsiveSoftButton
            disabled={isLoading}
            startIcon={<LockOpenIcon />}
            onClick={handleClick}
        >
            {t("Public")}
        </ResponsiveSoftButton>
    );
};

export default PublicButton;
