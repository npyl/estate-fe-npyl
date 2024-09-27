import { Box, Typography } from "@mui/material";
import { GridCellParams, GridColDef } from "@mui/x-data-grid";
import Image from "src/components/image";
import { KeyValue } from "src/types/KeyValue";
import { TranslationType } from "@/types/translation";
import RenderLabelsCell from "../shared/RenderLabels";
import { useTranslation } from "react-i18next";
import { IProperties, IPropertyResultResponse } from "@/types/properties";
import LinkOffOutlinedIcon from "@mui/icons-material/LinkOffOutlined";
import { getPropertyStatusColor } from "@/theme/colors";

import { NormalBadge } from "@/components/PropertyCard/styled";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import HomeOutLinedIcon from "@mui/icons-material/HomeOutlined";
import LandslideOutlinedIcon from "@mui/icons-material/LandslideOutlined";

function RenderImage(
    params: GridCellParams<IPropertyResultResponse | IProperties>
) {
    const propertyImage = params.row?.propertyImage;
    const isActive = params.row?.active;

    return (
        <Box
            sx={{
                position: "relative",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
            }}
        >
            <Image
                src={
                    typeof propertyImage === "string"
                        ? propertyImage
                        : propertyImage?.url
                }
                alt=""
                ratio="16/9"
                sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                }}
            />
            {!isActive && (
                <Box
                    sx={{
                        position: "absolute",
                        top: -5,
                        right: -7,
                        zIndex: 1,
                        width: 23,
                        height: 23,
                        bgcolor: "grey.400",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <LinkOffOutlinedIcon
                        sx={{ color: "aliceblue", fontSize: 18 }}
                    />
                </Box>
            )}
        </Box>
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
        <Typography
            sx={{ fontSize: "small", textAlign: "center", textWrap: "wrap" }}
        >
            {address}
        </Typography>
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
        <Box
            sx={{
                width: 150,
                height: 30,
                backgroundColor: color,
                color: "white",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {t(status)}
        </Box>
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
        sortable: false,
        flex: 1.2,
    },
    {
        field: "code",
        headerName: t("Code") as string,
        headerAlign: "center",
        align: "center",
        sortable: false,
        renderCell: (params: GridCellParams) => (
            <NormalBadge
                name={`${params.value || ""}`}
                color={"#ffcc00"}
                sx={{ color: "#854D0E" }}
            />
        ),
        flex: 1,
    },
    {
        field: "parentCategory",
        align: "center",
        headerAlign: "center",
        headerName: t("Parent Category") as string,
        renderCell: (params: GridCellParams) => {
            const categoryValue = (params.value as KeyValue)?.value;

            if (!categoryValue) return null;

            const categories = Array.isArray(categoryValue)
                ? categoryValue
                : categoryValue.split(/,\s*/);
            return (
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {categories.map((category: string, index: number) => (
                        <Box
                            key={index}
                            sx={{ display: "flex", alignItems: "center" }}
                        >
                            <Typography>{categoryToIcon(category)}</Typography>
                            <Typography
                                sx={{ marginRight: 1, fontSize: "small" }}
                            >
                                {t(category)}
                            </Typography>{" "}
                        </Box>
                    ))}
                </Box>
            );
        },
        sortable: false,
        flex: 1.4,
    },
    {
        field: "category",
        align: "center",
        headerAlign: "center",
        headerName: t("Category") as string,

        renderCell: (params) => (
            <div
                style={{
                    whiteSpace: "normal",
                    wordWrap: "break-word",
                    textAlign: "center",
                }}
            >
                {t((params.value as KeyValue)?.value)}
            </div>
        ),

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
        renderCell: renderImage,
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
