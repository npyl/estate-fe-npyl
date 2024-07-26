import { IconButton, Stack, Typography, ButtonBase } from "@mui/material";
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
        <ButtonBase
            onClick={
                hasPublic
                    ? openPublic
                    : hasSpitogato
                    ? openSpitogato
                    : undefined
            }
            sx={{ width: "100%", borderRadius: "10px" }} //Code to make the entire customStack clickable
        >
            <CustomStack
                flexDirection="row"
                gap={1}
                alignItems="center"
                sx={{ width: "100%" }}
            >
                <Typography ml={1} sx={{ textWrap: "nowrap" }}>
                    {t("Open in")}
                </Typography>
                {hasPublic && (
                    <IconButton size="small">
                        <PublicSvg />
                    </IconButton>
                )}
                {hasSpitogato && (
                    <IconButton size="small">
                        <SpitogatosSvg />
                    </IconButton>
                )}
            </CustomStack>
        </ButtonBase>
    );
};

export default OpenIn;
