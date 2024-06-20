import { IconButton, Stack, Typography } from "@mui/material";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import SpitogatosSvg from "src/assets/SpitogatosSvg";
import { PublicSvg } from "src/assets/PublicSvg";
import { useGetProperty } from "@/hooks/property";
import { styled } from "@mui/material/styles";
import { getBorderColor2 } from "@/theme/borderColor";
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

    const { hasPublic, hasSpitogato } = useMemo(() => {
        const hasPublic = publicListings.some(({ published }) => published);

        const hasSpitogato = restListings.find(
            ({ integrationSite }) => integrationSite === "SPITOGATOS"
        )?.published;

        return {
            hasPublic,
            hasSpitogato,
        };
    }, [publicListings, restListings]);

    // Hide this component if we have nothing...
    const hasNothing = !hasPublic && !hasSpitogato;

    const openPublic = useCallback(
        () =>
            window.open(
                `https://www.luxuryhomes.gr/property-detail/${property?.id}`,
                "_blank"
            ),
        [property?.id]
    );

    const openSpitogato = useCallback(() => {}, [property?.id]);

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
        </CustomStack>
    );
};

export default OpenIn;
