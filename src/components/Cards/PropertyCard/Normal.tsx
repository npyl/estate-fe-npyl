import { IProperties, IPropertyResultResponse } from "@/types/properties";
import { Divider, Stack, Typography, useTheme } from "@mui/material";
import { FC, useMemo, useRef } from "react";
import CarouselSimple from "@/components/CarouselSimple";
import { useTranslation } from "react-i18next";
import { SpaceBetween } from "@/components/styled";
import { DividerSx, NormalBadge, PriceBadge, StyledLink } from "./styled";
import { getPropertyStatusColor } from "@/theme/colors";

interface Props {
    name: string;
}

const CategoryBadge: FC<Props> = ({ name }) => {
    const theme = useTheme();
    const categoryColor = theme.palette.mode === "dark" ? "#b39ddb" : "#3730a3";
    return <NormalBadge name={name} color={categoryColor} />;
};

type PropertyCardProps = {
    item: IPropertyResultResponse | IProperties;
};

const PropertyCard: FC<PropertyCardProps> = ({ item }) => {
    const {
        id,
        images,
        details,
        price,
        code,
        state,
        category,
        parentCategory,
        area,
        plotArea,
    } = item || {};

    const { regionEN, regionGR, cityEN, cityGR, complexEN, complexGR } =
        (item as IPropertyResultResponse) || {};

    const bathrooms = details?.bathrooms;
    const bedrooms = details?.bedrooms;

    const { t, i18n } = useTranslation();

    const ref = useRef<HTMLAnchorElement>(null);

    const address = useMemo(() => {
        const addressParts =
            i18n.language === "en"
                ? [regionEN, cityEN, complexEN]
                : [regionGR, cityGR, complexGR];

        return addressParts.filter((part) => part).join(", ");
    }, [i18n.language]);

    const convertedImages = useMemo(
        () =>
            images.length > 0
                ? images.map((url, index) => {
                      let urlString = typeof url === "string" ? url : url?.url;
                      urlString =
                          urlString && urlString.startsWith("https://")
                              ? urlString
                              : "https://" + urlString;
                      return {
                          id: index,
                          url: urlString,
                          title: "",
                      };
                  })
                : [],
        [images]
    );

    const stateColor = getPropertyStatusColor(state.value);

    return (
        <StyledLink isActive={false} ref={ref} href={`/property/${id}`}>
            <CarouselSimple
                data={convertedImages}
                ratio="4/3"
                isActive={item.active}
            />

            <Stack px={2} py={2} spacing={0.8}>
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
                    ) : (
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
                    )}
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center">
                    <svg
                        width="14px"
                        height="14px"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                    </svg>
                    <Typography variant="body2" color="text.secondary">
                        {address}
                    </Typography>
                </Stack>

                <Divider sx={DividerSx} />

                <Stack
                    direction="row"
                    alignItems={"center"}
                    sx={{ flexWrap: "wrap", gap: 1 }}
                >
                    {state?.value ? (
                        <NormalBadge name={state.value} color={stateColor} />
                    ) : null}

                    <CategoryBadge name={category.value} />
                </Stack>
                <SpaceBetween alignItems="center">
                    <NormalBadge
                        name={`${t("Code")}: ${code || ""}`}
                        color={"#ffcc00"}
                        sx={{
                            color: (theme) =>
                                theme.palette.mode === "light"
                                    ? "#854D0E" // Fallback to grey if neutral is undefined
                                    : "null",
                        }}
                    />

                    <PriceBadge price={price} />
                </SpaceBetween>
            </Stack>
        </StyledLink>
    );
};

export default PropertyCard;
