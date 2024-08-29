import { LoadingButton } from "@mui/lab";
import { useTranslation } from "react-i18next";
import usePropertyImages from "../../hook";
import { useRouter } from "next/router";
import React from "react";
import { IntegrationSite } from "@/types/listings";
import { useIntegrationsOperations } from "../../context/IntegrationsOperations";

const COUNTS: Record<IntegrationSite, number> = {
    SPITOGATOS: 25,
    JAMES_EDITION: 20,
    // ...
    FERIMMO: 10,
    PLOT_GR: 10,
    RIGHT_MOVE: 10,
    XE: 10,
};

interface AddXButtonProps {
    integrationSite: IntegrationSite;
}

const AddXButton: React.FC<AddXButtonProps> = ({ integrationSite }) => {
    const { t } = useTranslation();

    const router = useRouter();
    const { propertyId } = router.query;

    const { setOrderedImages, isLoading } = useIntegrationsOperations();

    const { images } = usePropertyImages();

    const count = COUNTS[integrationSite];

    const handleClick = () => {
        setOrderedImages({
            propertyId: +propertyId!,
            propertyImages: images.slice(0, count).map(({ key }) => key),
            integrationSite,
        });
    };

    return (
        <LoadingButton
            disabled={isLoading}
            variant="contained"
            onClick={handleClick}
        >
            {`${t("Add first")} ${count}`}
        </LoadingButton>
    );
};

export default AddXButton;
