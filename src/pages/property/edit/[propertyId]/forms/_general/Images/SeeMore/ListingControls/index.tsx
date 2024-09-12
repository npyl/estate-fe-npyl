import { useGetIntegrationOrderedImagesQuery } from "@/services/integrations";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/router";
import React from "react";
import { IntegrationSite } from "@/types/listings";
import AddXButton from "./AddX";
import RemoveAll from "./RemoveAll";

interface ListingControlsProps {
    integrationSite: IntegrationSite;
}

const ListingControls: React.FC<ListingControlsProps> = ({
    integrationSite,
}) => {
    const router = useRouter();
    const { propertyId } = router.query;

    const { data } = useGetIntegrationOrderedImagesQuery({
        propertyId: +propertyId!,
        integrationSite,
    });

    const hasImages = data?.publicKeys?.length && data?.publicKeys.length > 0;

    return (
        <Stack direction="row" alignItems="center" gap={1}>
            {!hasImages ? (
                <AddXButton integrationSite={integrationSite} />
            ) : null}
            {hasImages ? <RemoveAll tab={integrationSite} /> : null}
        </Stack>
    );
};

export default ListingControls;
