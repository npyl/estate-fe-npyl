import { IconButton, Stack, Typography, ButtonBase } from "@mui/material";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import SpitogatosSvg from "@/assets/integrations/SpitogatosSvg";
import useGetProperty from "@/sections/Properties/hooks/useGetProperty";
import { styled } from "@mui/material/styles";
import { getBorderColor2 } from "@/theme/borderColor";
import PublicLogo from "@/assets/logo/Public";
import usePropertyListings from "@/sections/Properties/hooks/usePropertyListings";

const CustomStack = styled(Stack)(({ theme }) => ({
    border: "1px solid",
    borderColor: getBorderColor2(theme),
    borderRadius: "10px",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
}));

const OpenIn = () => {
    const { t, i18n } = useTranslation();

    const lang = i18n.language === "en" ? "en" : "gr";

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
                `https://www.luxuryhomes.gr/${lang}/property-detail/${property?.id}`,
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
            sx={{
                width: "100%",
                borderRadius: "10px",
            }}
        >
            <CustomStack
                flexDirection="row"
                gap={1}
                alignItems="center"
                padding={0.8}
                sx={{
                    width: "100%",
                    "&:hover": {
                        borderColor: "neutral.400",
                    },
                }}
            >
                <Typography sx={{ ml: 1, textWrap: "nowrap" }}>
                    {t("Open in")}
                </Typography>
                {hasPublic && (
                    <IconButton size="small">
                        <PublicLogo />
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
