import { Box, Paper, Stack, Typography } from "@mui/material";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
    useAddPublicListingMutation,
    useRemovePublicListingMutation,
} from "src/services/listings";
import { properties } from "src/services/properties";
import GoogleEarth from "./GoogleEarth";
import PublicCard from "./PublicCard";
import ListingCard from "./ListingCard";
import usePropertyListings from "@/hooks/listings";

const Right = () => {
    const dispatch = useDispatch();

    const { publicListings, restListings, propertyId } = usePropertyListings();

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
        <Paper
            elevation={10}
            component={Stack}
            p={2}
            alignItems="center"
            mt={10}
        >
            <Typography variant="h4">Websites to publish to:</Typography>

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
