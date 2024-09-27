import { Stack, Typography } from "@mui/material";
import { GridCellParams, GridColDef } from "@mui/x-data-grid";
import Image from "src/components/image";
import { KeyValue } from "src/types/KeyValue";
import { TranslationType } from "@/types/translation";
import RenderLabelsCell from "../shared/RenderLabels";
import { useTranslation } from "react-i18next";
import { IProperties, IPropertyResultResponse } from "@/types/properties";
import LinkOffOutlinedIcon from "@mui/icons-material/LinkOffOutlined";
import { getPropertyStatusColor } from "@/theme/colors";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import HomeOutLinedIcon from "@mui/icons-material/HomeOutlined";
import LandslideOutlinedIcon from "@mui/icons-material/LandslideOutlined";

import { NormalBadge } from "@/components/Cards/PropertyCard/styled";

function RenderImage(
    params: GridCellParams<IPropertyResultResponse | IProperties>
) {
    const propertyImage = params.row?.propertyImage;
    const isActive = params.row?.active;
    const src =
        typeof propertyImage === "string" ? propertyImage : propertyImage?.url;

    return (
        <Stack
            position="relative"
            width={1}
            height={1}
            alignItems="center"
            justifyContent="center"
        >
            <Image
                src={src}
                alt=""
                ratio="16/9"
                sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                }}
            />

            {!isActive && (
                <Stack
                    sx={{
                        position: "absolute",
                        top: 2,
                        right: -4,
                        zIndex: 5000,
                        width: 23,
                        height: 23,
                        bgcolor: "grey.400",
                        borderRadius: "50%",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <LinkOffOutlinedIcon
                        sx={{ color: "aliceblue", fontSize: 18 }}
                    />
                </Stack>
            )}
        </Stack>
    );
}

function RenderLocation(params: GridCellParams<IPropertyResultResponse>) {
    const { regionEN, regionGR, cityEN, cityGR, complexEN, complexGR } =
        params.row || {};

    const { i18n } = useTranslation();

    const addressParts =
        i18n.language === "en"
            ? [regionEN, cityEN, complexEN]
            : [regionGR, cityGR, complexGR];

    const address = addressParts.filter((part) => part).join(", ");

    return (
        <Stack width={1} height={1} alignItems="center" justifyContent="center">
            <Typography fontSize="small" textAlign="center" whiteSpace="wrap">
                {address}
            </Typography>
        </Stack>
    );
}

function StatusColor(params: GridCellParams) {
    const { t } = useTranslation();

    if (!params.value) return <></>;
    const value = params.value as KeyValue;
    const status = (value.value as string)?.trim();

    if (!value || !status) return <></>;

    const statusForColor = (value.key as string)?.trim();
    const color = getPropertyStatusColor(statusForColor);

    return (
        <Stack width={1} height={1} justifyContent="center" alignItems="center">
            <Typography
                bgcolor={color}
                color="white"
                borderRadius="20px"
                px={1.5}
                py={1}
            >
                {t(status)}
            </Typography>
        </Stack>
    );
}

//format value number with dots
const formatNumberWithPeriod = (num: any) => {
    if (num === null || num === undefined) {
        return "";
    }
    const numericValue = num.toString().replace(/[^0-9]/g, "");
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const categoryToIcon = (category: string) => {
    switch (category.trim().toLowerCase()) {
        case "κατοικία":
            return (
                <HomeOutLinedIcon
                    sx={{
                        marginRight: 0.5,
                        color: "neutral.600",
                        fontSize: "16px",
                    }}
                />
            );
        case "επαγγελματική στέγη":
            return (
                <BusinessOutlinedIcon
                    sx={{
                        marginRight: 0.5,
                        color: "neutral.600",
                        fontSize: "16px",
                    }}
                />
            );
        case "γη":
            return (
                <LandslideOutlinedIcon
                    sx={{
                        marginRight: 0.5,
                        color: "neutral.600",
                        fontSize: "16px",
                    }}
                />
            );

        default:
            return null;
    }
};

const RenderCodeCell = (params: GridCellParams) => {
    if (!params.value) return null;

    return (
        <Stack width={1} height={1} justifyContent="center" alignItems="center">
            <NormalBadge
                name={`${params.value || ""}`}
                color={"#ffcc00"}
                sx={{ color: "#854D0E" }}
            />
        </Stack>
    );
};

const RenderParentCategoryCell = (params: GridCellParams) => {
    const { t } = useTranslation();

    const categoryValue = (params.value as KeyValue)?.value;

    if (!categoryValue) return null;

    return (
        <Stack alignItems="center" justifyContent="center" width={1} height={1}>
            <Stack direction="row" spacing={1}>
                <Typography>{categoryToIcon(categoryValue)}</Typography>
                <Typography mr={1} fontSize="small">
                    {t(categoryValue)}
                </Typography>{" "}
            </Stack>
        </Stack>
    );
};

const RenderCategoryCell = (params: GridCellParams) => {
    const { t } = useTranslation();
    return (
        <div
            style={{
                whiteSpace: "normal",
                wordWrap: "break-word",
                textAlign: "center",
            }}
        >
            {t((params.value as KeyValue)?.value)}
        </div>
    );
};

//
//  View Properties
//
export const getColumns = (t: TranslationType): GridColDef[] => [
    {
        field: "propertyImage",
        headerName: t("Thumbnail") as string,
        align: "center",
        headerAlign: "center",
        renderCell: RenderImage,
        flex: 1.2,
    },
    {
        field: "code",
        headerName: t("Code") as string,
        headerAlign: "center",
        align: "center",
        renderCell: RenderCodeCell,
        flex: 1,
    },
    {
        field: "parentCategory",
        align: "center",
        headerAlign: "center",
        headerName: t("Parent Category") as string,
        renderCell: RenderParentCategoryCell,
        flex: 1.4,
    },
    {
        field: "category",
        align: "center",
        headerAlign: "center",
        headerName: t("Category") as string,
        renderCell: RenderCategoryCell,
        flex: 1,
    },
    {
        field: "price",
        headerAlign: "center",
        align: "center",
        headerName: t("Price") as string,
        renderCell: (params: GridCellParams) => {
            const formattedPrice = formatNumberWithPeriod(params.value);
            return formattedPrice ? `${formattedPrice} €` : "";
        },

        flex: 0.8,
    },
    {
        field: "state",
        headerAlign: "center",
        align: "center",
        headerName: t("State") as string,
        renderCell: StatusColor,
        flex: 1,
    },
    {
        field: "area",
        headerAlign: "center",
        align: "center",
        headerName: t("Area") as string,
        renderCell: (params: GridCellParams) => {
            return params.value ? `${params.value} m²` : "";
        },
        flex: 0.8,
    },
    {
        field: "labels",
        headerAlign: "center",
        align: "center",
        headerName: t("Labels") as string,
        renderCell: RenderLabelsCell,
        flex: 1,
    },
    {
        field: "location",
        headerAlign: "center",
        align: "center",
        headerName: t("Location") as string,
        renderCell: RenderLocation,
        flex: 1,
    },
];

//
//  Matching Properties
//
export const getSmallColumns = (t: TranslationType): GridColDef[] => [
    {
        field: "propertyImage",
        headerName: t("Thumbnail") || "",
        width: 180,
        align: "center",
        headerAlign: "center",
        renderCell: RenderImage,
    },
    {
        field: "code",
        headerName: t("Reference ID") || "",
        width: 180,
        headerAlign: "center",
        align: "center",
    },
    {
        field: "parentCategory",
        headerName: t("Category") || "",
        width: 180,
        align: "center",
        headerAlign: "center",
        renderCell: (params) => params.value?.key,
    },
    {
        field: "category",
        headerName: t("Subcategory") || "",
        width: 180,
        align: "center",
        headerAlign: "center",
        renderCell: (params) => params.value?.key,
    },
];
