import SoftButton from "@/components/SoftButton";
import { IntegrationSite } from "@/types/listings";
import { useTranslation } from "react-i18next";
import { TListingTab } from "../types";
import { useRouter } from "next/router";
import { useIntegrationsOperations } from "../../context/IntegrationsOperations";

interface RemoveAllButtonProps {
    tab: TListingTab;
}

const RemoveAllButton: React.FC<RemoveAllButtonProps> = ({ tab }) => {
    const { t } = useTranslation();
    const router = useRouter();
    const { propertyId } = router.query;

    const { setOrderedImages, isLoading } = useIntegrationsOperations();

    const handleClick = () => {
        setOrderedImages({
            integrationSite: tab as IntegrationSite,
            propertyId: +propertyId!,
            propertyImages: [],
        });
    };

    return (
        <SoftButton disabled={isLoading} color="error" onClick={handleClick}>
            {t("Remove All")}
        </SoftButton>
    );
};

export default RemoveAllButton;
