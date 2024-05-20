import { Box, Paper, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import {
    useAddPublicListingMutation,
    useRemovePublicListingMutation,
} from "src/services/listings";
import {
    properties,
    useGetPropertyListingsQuery,
} from "src/services/properties";
import GoogleEarth from "./GoogleEarth";
import PublicCard from "./PublicCard";
import ListingCard from "./ListingCard";

const Right = () => {
    const dispatch = useDispatch();

    const router = useRouter();
    const { propertyId } = router.query;

    const { data: listings } = useGetPropertyListingsQuery(+propertyId!);

    const { publicListings, restListings } = useMemo(
        () => ({
            publicListings: listings?.publicSites || [],
            restListings: listings?.integrations || [],
        }),
        [listings]
    );

    const invalidateTags = useCallback(
        () =>
            dispatch(properties.util.invalidateTags(["PropertyByIdListings"])),
        []
    );

    // Mutations
    const [publishPublicSite] = useAddPublicListingMutation();
    const [unpublishPublicSite] = useRemovePublicListingMutation();

    const handlePublicClick = useCallback(async (p: boolean) => {
        try {
            if (p) await unpublishPublicSite(+propertyId!);
            else await publishPublicSite(+propertyId!);
            invalidateTags();
        } catch (err) {}
    }, []);

    return (
        <Paper elevation={10} component={Stack} p={2} alignItems="center">
            <Typography variant="h4" mt={10} mb={5}>
                Websites to publish to:
            </Typography>

            {publicListings?.map(
                ({ publicSite: { id, siteUrl }, published }) => (
                    <PublicCard
                        key={id}
                        label={siteUrl}
                        published={published}
                        onClick={() => handlePublicClick(published)}
                    />
                )
            )}

            {restListings?.map(({ integrationSite, published }) => (
                <ListingCard
                    key={integrationSite}
                    label={integrationSite}
                    value={published}
                    onClick={invalidateTags}
                />
            ))}

            <Box>
                <Typography variant="h4">Upload Google Earth</Typography>
                <GoogleEarth />
            </Box>
        </Paper>
    );
};

export default Right;
