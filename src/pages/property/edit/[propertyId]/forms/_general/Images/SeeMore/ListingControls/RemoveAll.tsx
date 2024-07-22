import { SoftButton } from "@/components/SoftButton";
import { useSetIntegrationOrderedImagesMutation } from "@/services/integrations";
import { IntegrationSite } from "@/types/listings";
import { useTranslation } from "react-i18next";
import { TListingTab } from "../types";
import { useRouter } from "next/router";

interface RemoveAllButtonProps {
    tab: TListingTab;
}

const RemoveAllButton: React.FC<RemoveAllButtonProps> = ({ tab }) => {
    const { t } = useTranslation();
    const router = useRouter();
    const { propertyId } = router.query;

    const [setImages] = useSetIntegrationOrderedImagesMutation();

    const handleClick = () => {
        setImages({
            integrationSite: tab as IntegrationSite,
            propertyId: +propertyId!,
            propertyImages: [],
        });
    };

    return (
        <SoftButton color="error" onClick={handleClick}>
            {t("Remove All")}
        </SoftButton>
    );
};

export default RemoveAllButton;
