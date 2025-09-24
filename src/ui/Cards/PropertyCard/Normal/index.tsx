import { IProperties, IPropertyResultResponse } from "@/types/properties";
import { Divider, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { DividerSx, StyledLink } from "../styled";
import { LinkProps } from "@/components/Link";
import Address from "../_shared/Address";
import Badges from "../_shared/Badges";
import Carousel from "../_shared/Carousel";

type PropertyCardProps = {
    item: IPropertyResultResponse | IProperties;
} & Omit<LinkProps, "href">;

const PropertyCard: FC<PropertyCardProps> = ({ item, ...props }) => {
    const {
        id,
        images = [],
        details,
        parentCategory,
        area,
        plotArea,
    } = item || {};

    const bathrooms = details?.bathrooms;
    const bedrooms = details?.bedrooms;

    return (
        <StyledLink
            isActive={false}
            href={`/property/${id}`}
            {...(props as any)}
        >
            <Carousel images={images} ratio="4/3" isActive={item.active} />

            <Stack p={2} spacing={0.8}>
                <Stack spacing={1} direction="row" mt={1} flexWrap="wrap">
                    {parentCategory.key !== "LAND" ? (
                        <Stack
                            spacing={2}
                            direction="row"
                            mt={1}
                            flexWrap="nowrap"
                        >
                            <Stack
                                direction="row"
                                spacing={0.5}
                                alignItems="center"
                            >
                                <Typography>
                                    <i className="las la-chart-area" />
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ textWrap: "nowrap" }}
                                >
                                    {plotArea || "-"}
                                    {plotArea ? " m²" : null}
                                </Typography>
                            </Stack>
                            <Stack
                                direction="row"
                                spacing={0.5}
                                alignItems="center"
                            >
                                <Typography>
                                    <i className="las la-expand-arrows-alt" />
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ textWrap: "nowrap" }}
                                >
                                    {area || "-"}
                                    {area ? " m²" : null}
                                </Typography>
                            </Stack>
                            <Stack
                                direction="row"
                                spacing={0.8}
                                alignItems="center"
                            >
                                <Typography>
                                    <i className="las la-bed" />
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ textWrap: "nowrap" }}
                                >
                                    {bedrooms || item.bedrooms || "-"}{" "}
                                </Typography>
                            </Stack>
                            <Stack
                                direction="row"
                                spacing={0.8}
                                alignItems="center"
                            >
                                <Typography>
                                    <i className="las la-bath" />
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ textWrap: "nowrap" }}
                                >
                                    {bathrooms || item.bathrooms || "-"}{" "}
                                </Typography>
                            </Stack>
                        </Stack>
                    ) : null}

                    {parentCategory.key === "LAND" ? (
                        <Stack
                            spacing={2}
                            direction="row"
                            mt={1}
                            flexWrap="nowrap"
                        >
                            <Stack
                                direction="row"
                                spacing={0.5}
                                alignItems="center"
                            >
                                <Typography>
                                    <i className="las la-chart-area" />
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {plotArea || "-"}
                                    {" m²"}
                                </Typography>
                            </Stack>
                            <Stack
                                direction="row"
                                spacing={0.5}
                                alignItems="center"
                            >
                                <Typography>
                                    <i className="la-divide " />
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {details?.setbackCoefficient || "-"}
                                </Typography>
                            </Stack>
                            <Stack
                                direction="row"
                                spacing={0.5}
                                alignItems="center"
                            >
                                <Typography>
                                    <i className="las la-expand-arrows-alt" />
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {details?.frontage || item?.plotArea || "-"}
                                    {" m²"}
                                </Typography>
                            </Stack>
                        </Stack>
                    ) : null}
                </Stack>

                <Address item={item} />

                <Divider sx={DividerSx} />

                <Badges item={item} />
            </Stack>
        </StyledLink>
    );
};

export default PropertyCard;
