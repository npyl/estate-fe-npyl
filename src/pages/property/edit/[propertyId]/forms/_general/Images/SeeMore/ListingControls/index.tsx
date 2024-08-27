import { useGetIntegrationOrderedImagesQuery } from "@/services/integrations";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/router";
import React from "react";
import { TListingTab } from "../types";
import { IntegrationSite } from "@/types/listings";
import Add20Button from "./Add20";
import RemoveAll from "./RemoveAll";

interface ListingControlsProps {
    tab: TListingTab;
}

const ListingControls: React.FC<ListingControlsProps> = ({ tab }) => {
    const router = useRouter();
    const { propertyId } = router.query;

    const { data } = useGetIntegrationOrderedImagesQuery({
        propertyId: +propertyId!,
        integrationSite: tab as IntegrationSite,
    });

    const hasImages = data?.publicKeys.length && data?.publicKeys.length > 0;

    return (
        <Stack direction="row" alignItems="center" gap={1}>
            {!hasImages ? <Add20Button tab={tab} /> : null}
            {hasImages ? <RemoveAll tab={tab} /> : null}
        </Stack>
    );
};

export default ListingControls;
