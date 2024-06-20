import { Paper, Stack, Typography } from "@mui/material";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
    useAddPublicListingMutation,
    useRemovePublicListingMutation,
} from "src/services/listings";
import { properties } from "src/services/properties";
import PublicItem from "./PublicItem";
import IntegrationItem from "./IntegrationItem";
import usePropertyListings from "@/hooks/listings";
import { useTranslation } from "react-i18next";

// ------------------------------------------------------------------------------------

interface PublicSitesProps {
    onClick: VoidFunction;
}

const PublicSites: React.FC<PublicSitesProps> = ({ onClick }) => {
    const { publicListings, propertyId } = usePropertyListings();

    // Mutations
    const [publishPublicSite] = useAddPublicListingMutation();
    const [unpublishPublicSite] = useRemovePublicListingMutation();

    const handlePublicClick = useCallback(async (p: boolean) => {
        try {
            if (p) await unpublishPublicSite(+propertyId!);
            else await publishPublicSite(+propertyId!);
            onClick();
        } catch (err) {}
    }, []);

    return publicListings?.map(({ publicSite: { id, siteUrl }, published }) => (
        <PublicItem
            key={id}
            label={siteUrl}
            published={published}
            onClick={() => handlePublicClick(published)}
        />
    ));
};

interface IntegrationsProps {
    onClick: VoidFunction;
}

const Integrations: React.FC<IntegrationsProps> = ({ onClick }) => {
    const { restListings } = usePropertyListings();

    return restListings?.map(({ integrationSite, published }) => (
        <IntegrationItem
            key={integrationSite}
            label={integrationSite}
            value={published}
            onClick={onClick}
        />
    ));
};

// ------------------------------------------------------------------------------------

const Right = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const invalidateTags = useCallback(
        () =>
            dispatch(properties.util.invalidateTags(["PropertyByIdListings"])),
        []
    );

    return (
        <Paper
            elevation={10}
            component={Stack}
            p={2}
            px={4}
            alignItems="center"
            minHeight="400px"
        >
            <Typography variant="h4" my={5} textAlign="center">
                {t("Websites to publish to:")}
            </Typography>

            <Stack gap={1}>
                <PublicSites onClick={invalidateTags} />
                <Integrations onClick={invalidateTags} />
            </Stack>
        </Paper>
    );
};

export default Right;
