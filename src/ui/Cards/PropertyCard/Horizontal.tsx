import { IProperties, IPropertyResultResponse } from "@/types/properties";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { DividerSx, StyledLink } from "./styled";
import { LinkProps } from "@/components/Link";
import Carousel from "./_shared/Carousel";
import Badges from "./_shared/Badges";
import Address from "./_shared/Address";

type PropertyCardProps = {
    item: IPropertyResultResponse | IProperties;
} & Omit<LinkProps, "href">;

// -------------------------------------------------------------

const PropertyCard: FC<PropertyCardProps> = ({ item, ...props }) => {
    const { id, images = [], details, area, plotArea } = item || {};

    const { bathrooms, bedrooms } = details || {};

    const { t } = useTranslation();

    return (
        <StyledLink
            isActive={false}
            href={`/property/${id}`}
            // ...
            border="1px solid"
            borderColor="divider"
            {...(props as any)}
        >
            <Stack direction="row" spacing={1} alignItems="center" p={1}>
                {/* //do not change the Box width */}
                <Box width="35%">
                    <Carousel
                        images={images}
                        ratio="4/3"
                        isActive={item.active}
                        borderRadius={2}
                    />
                </Box>
                <Stack
                    px={2}
                    py={2}
                    spacing={2}
                    justifyContent="space-around"
                    minWidth="64%" //do not change
                    height="100%"
                >
                    <Address item={item} />

                    <Divider sx={DividerSx} />

                    <Stack spacing={2.5} direction="row" mt={1} flexWrap="wrap">
                        {/* ---- */}
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Typography>
                                <i className="las la-bed" />
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {bedrooms || "-"}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {t("beds")}
                            </Typography>
                        </Stack>
                        {/* ---- */}
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Typography>
                                <i className="las la-bath" />
                            </Typography>

                            <Typography variant="body2" color="text.secondary">
                                {bathrooms || "-"}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {t("baths")}
                            </Typography>
                        </Stack>
                        {/* ---- */}
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Typography>
                                <i className="las la-expand-arrows-alt " />
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {area || "-"}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {"m²"}
                            </Typography>
                        </Stack>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Typography>
                                <i className="las la-chart-area" />
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {plotArea || "-"}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {"m²"}
                            </Typography>
                        </Stack>
                    </Stack>

                    <Divider sx={DividerSx} />

                    <Badges item={item} />
                </Stack>
            </Stack>
        </StyledLink>
    );
};

export default PropertyCard;
