import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import React from "react";
import LockIcon from "@mui/icons-material/Lock";
import { ResponsiveSoftButton } from "../../styled";
import { useIntegrationsOperations } from "../../../../context/IntegrationsOperations";
import { TListingTab } from "../../../types";
import { IntegrationSite } from "@/types/listings";

interface PrivateButtonProps {
    tab: TListingTab;
    selectedImages: string[];
}

const PrivateButton: React.FC<PrivateButtonProps> = ({
    tab,
    selectedImages,
}) => {
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
            startIcon={<LockIcon />}
            onClick={handleClick}
        >
            {t("Private")}
        </ResponsiveSoftButton>
    );
};

export default PrivateButton;
