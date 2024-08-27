import { useRouter } from "next/router";
import { useIntegrationsOperations } from "../../../../context/IntegrationsOperations";
import { TListingTab } from "../../../types";
import { IntegrationSite } from "@/types/listings";
import { useGetIntegrationOrderedImagesQuery } from "@/services/integrations";

// INFO: filter out all elements of b from a
const filterOut = (a: string[], b: string[]) => a.filter((a) => !b.includes(a));

const useMakePrivate = (tab: TListingTab, selectedImages: string[]) => {
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

    const makePrivate = () => {
        const publicKeys = data?.publicKeys || [];

        setOrderedImages({
            integrationSite: tab as IntegrationSite,
            propertyId: +propertyId!,
            propertyImages: filterOut(publicKeys, selectedImages),
        });
    };

    return {
        makePrivate,
        isLoading: isGetLoading || isUpdateLoading,
    };
};

export default useMakePrivate;
