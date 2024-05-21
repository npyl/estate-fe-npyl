import { IconButton, Stack, Typography } from "@mui/material";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import SpitogatosSvg from "src/assets/SpitogatosSvg";
import { PublicSvg } from "src/assets/PublicSvg";
import GoogleEarthSvg from "src/assets/GoogleEarth";
import { useGetProperty } from "@/hooks/property";
import { styled } from "@mui/material/styles";
import { getBorderColor2 } from "@/theme/borderColor";
import React from "react";
import usePropertyListings from "@/hooks/listings";

const CustomStack = styled(Stack)(({ theme }) => ({
    border: "1px solid",
    borderColor: getBorderColor2(theme),
    borderRadius: "10px",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
}));

const OpenIn = () => {
    const { t } = useTranslation();

    const { property } = useGetProperty();
    const { publicListings, restListings } = usePropertyListings();

    const { hasPublic, hasSpitogato, hasGoogleEarth } = useMemo(() => {
        const hasPublic = publicListings.find(
            ({ integrationSite }) => integrationSite === ("PUBLIC_SITE" as any)
        )?.published;

        const hasSpitogato = restListings.find(
            ({ integrationSite }) => integrationSite === "SPITOGATOS"
        )?.published;

        return {
            hasPublic,
            hasSpitogato,
            hasGoogleEarth: !!property?.googleEarth,
        };
    }, [publicListings, restListings, property?.googleEarth]);

    // Hide this component if we have nothing...
    const hasNothing = !hasPublic && !hasSpitogato && !hasGoogleEarth;

    const openPublic = useCallback(
        () =>
            window.open(
                `https://www.luxuryhomes.gr/property-detail/${property?.id}`,
                "_blank"
            ),
        [property?.id]
    );

    const openSpitogato = useCallback(() => {}, [property?.id]);

    const openGoogleEarth = useCallback(
        () => window.open(property?.googleEarth?.url, "_blank"),
        [property?.googleEarth?.url]
    );

    if (hasNothing) return null;

    return (
        <CustomStack flexDirection="row" gap={0.5} alignItems="center">
            <Typography>{t("Open in")}</Typography>
            {hasPublic ? (
                <IconButton size="small" onClick={openPublic}>
                    <PublicSvg />
                </IconButton>
            ) : null}
            {hasSpitogato ? (
                <IconButton size="small" onClick={openSpitogato}>
                    <SpitogatosSvg />
                </IconButton>
            ) : null}
            {hasGoogleEarth ? (
                <IconButton size="small" onClick={openGoogleEarth}>
                    <GoogleEarthSvg />
                </IconButton>
            ) : null}
        </CustomStack>
    );
};

export default OpenIn;
