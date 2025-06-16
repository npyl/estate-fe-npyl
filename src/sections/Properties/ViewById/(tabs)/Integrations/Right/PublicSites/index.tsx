import React, { useCallback } from "react";
import {
    useAddPublicListingMutation,
    useRemovePublicListingMutation,
} from "@/services/listings";
import PublicItem from "./PublicItem";
import usePropertyListings from "@/hooks/listings";
import useInvalidateTags from "../useInvalidateTags";

interface PublicSitesProps {
    onClick: VoidFunction;
}

const PublicSites: React.FC<PublicSitesProps> = ({ onClick }) => {
    const { invalidateTags } = useInvalidateTags();

    const { publicListings, propertyId } = usePropertyListings();

    // Mutations
    const [publishPublicSite] = useAddPublicListingMutation();
    const [unpublishPublicSite] = useRemovePublicListingMutation();

    const handlePublicClick = useCallback(
        async (p: boolean, siteId: number) => {
            try {
                const cb = p ? unpublishPublicSite : publishPublicSite;

                await cb({
                    propertyId: +propertyId!,
                    siteId,
                });

                invalidateTags();

                onClick();
            } catch (err) {}
        },
        [propertyId]
    );

    return publicListings?.map(({ publicSite: { id, siteUrl }, published }) => (
        <PublicItem
            key={id}
            label={siteUrl}
            published={published}
            onClick={() => handlePublicClick(published, id)}
        />
    ));
};

export default PublicSites;
