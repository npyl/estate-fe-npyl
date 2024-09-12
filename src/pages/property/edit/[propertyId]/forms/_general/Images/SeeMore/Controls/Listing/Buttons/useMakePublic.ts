import { useRouter } from "next/router";
import { useIntegrationsOperations } from "../../../../context/IntegrationsOperations";
import { TListingTab } from "../../../types";
import { IntegrationSite } from "@/types/listings";
import { useGetIntegrationOrderedImagesQuery } from "@/services/integrations";

// INFO: append only unique elements to an array
const appendUnique = (a: string[], b: string[]) => [...new Set([...a, ...b])];

const useMakePublic = (tab: TListingTab, selectedImages: string[]) => {
    const router = useRouter();
    const { propertyId } = router.query;

    const { data, isLoading: isGetLoading } =
        useGetIntegrationOrderedImagesQuery(
            {
                integrationSite: tab as IntegrationSite,
                propertyId: +propertyId!,
            },
            { skip: tab === "CRM" }
        );

    const { setOrderedImages, isLoading: isUpdateLoading } =
        useIntegrationsOperations();

    const makePublic = () => {
        const publicKeys = data?.publicKeys || [];

        setOrderedImages({
            integrationSite: tab as IntegrationSite,
            propertyId: +propertyId!,
            propertyImages: appendUnique(publicKeys, selectedImages),
        });
    };

    return {
        makePublic,
        isLoading: isGetLoading || isUpdateLoading,
    };
};

export default useMakePublic;
