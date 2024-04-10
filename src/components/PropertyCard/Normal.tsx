import { IProperties, IPropertyResultResponse } from "@/types/properties";
import { IMapMarker } from "../Map/Map";
import { Box, Divider, Stack } from "@mui/material";
import { useMemo } from "react";
import CarouselSimple from "../CarouselSimple";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { SpaceBetween } from "../styled";

type PropertyCardProps = {
    item: IPropertyResultResponse | IProperties;
    selectedMarker: IMapMarker | null;
};

const defaultImage = "/static/noImage.png";

const PropertyCard = ({ item, selectedMarker }: PropertyCardProps) => {
    const { id, images, details } = item || {};
    const { bathrooms, bedrooms } = details || {};

    const { t } = useTranslation();
    const router = useRouter();

    const convertedImages = useMemo(
        () =>
            images.map((url, index) => ({
                id: index,
                url: (typeof url === "string" ? url : url.url) || defaultImage,
                title: "",
            })) || [],
        [images]
    );

    return (
        <Box borderRadius="12px">
            <CarouselSimple
                onImageClick={() => router.push(`property/${id}`)}
                data={convertedImages}
                ratio="4/3"
            />

            <Box
                px={2}
                pb={2}
                sx={{
                    cursor: "pointer",
                }}
            >
                <Stack spacing={2}>
                    <Stack spacing={1}>
                        {/* ---- */}
                        <Stack direction="row" spacing={1} alignItems="center">
                            <span className=" sm:inline-block mb-[3px]">
                                <i className="las la-bed text-lg"></i>
                            </span>
                            <span className="text-xs text-neutral-500 dark:text-neutral-400">
                                {bedrooms || "N/A"} {t("beds")}
                            </span>
                        </Stack>
                        {/* ---- */}
                        <div className="flex items-center space-x-1">
                            <span className=" sm:inline-block mb-[3px]">
                                <i className="las la-bath text-lg"></i>
                            </span>
                            <span className="text-xs text-neutral-500 dark:text-neutral-400">
                                {bathrooms || "N/A"} {t("baths")}
                            </span>
                        </div>
                        {/* ---- */}
                        <div className="flex items-center space-x-1">
                            <span className=" sm:inline-block mb-[3px]">
                                <i className="las la-expand-arrows-alt text-lg"></i>
                            </span>
                            {/* <span className="text-xs text-neutral-500 dark:text-neutral-400">
                                {area || "N/A"} m²
                            </span> */}
                        </div>
                    </Stack>
                    {/* <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-1.5">
                        <span className="">{address}</span>
                    </div> */}
                </Stack>
                {/* <div className="w-14 border-b border-neutral-100 dark:border-neutral-800" /> */}
                <Divider />
                <Stack direction="row" spacing={2}>
                    {/* {state?.value && (
                        <Badge
                            name={
                                <div className="flex items-center">
                                    <span>{t(state?.value)}</span>
                                </div>
                            }
                            className="border-r-0"
                            color="indigo"
                        />
                    )}
                    {category?.value && (
                        <Badge
                            name={
                                <div className="flex items-center">
                                    <span>{t(category?.value)}</span>
                                </div>
                            }
                            color="indigo"
                        />
                    )} */}
                </Stack>
                <SpaceBetween alignItems="center">
                    <div className="inline-flex space-x-3 items-center">
                        {/* <Badge
                            name={
                                <div className="flex items-center">
                                    <span>
                                        {t("Code")}: {code}
                                    </span>
                                </div>
                            }
                            color="yellow"
                        /> */}
                    </div>
                    {/* <span className="flex items-center border-gray-500 text-gray-500 justify-center px-2.5 py-1.5 border-2  rounded-lg leading-none text-sm font-medium ">
                        {`${price ? formatNumberWithCommas(price) : "N/A"} €`}
                    </span> */}
                </SpaceBetween>
            </Box>
        </Box>
    );
};

export default PropertyCard;
