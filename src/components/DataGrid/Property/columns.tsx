import { Box } from "@mui/material";
import { GridCellParams, GridColDef } from "@mui/x-data-grid";
import Image from "src/components/image";
import { KeyValue } from "src/types/KeyValue";
import { TranslationType } from "@/types/translation";
import RenderLabelsCell from "../shared/RenderLabels";
import { useTranslation } from "react-i18next";
import { IProperties, IPropertyResultResponse } from "@/types/properties";

const defaultImage = "/static/noImage.png";

function renderImage(
    params: GridCellParams<IPropertyResultResponse | IProperties>
) {
    const propertyImage = params.row?.propertyImage;

    return (
        <Image
            src={
                `${
                    typeof propertyImage === "string"
                        ? propertyImage
                        : propertyImage?.url
                }` || defaultImage
            }
            alt=""
            ratio="16/9"
        />
    );
}

type PropertyStatus =
    | "SOLD"
    | "SALE"
    | "RENTED"
    | "UNAVAILABLE"
    | "RENT"
    | "TAKEN"
    | "UNDER_CONSTRUCTION"
    | "UNDER_MAINTENANCE";

type Color = string;

type StatusColors = Record<PropertyStatus, Color>;

const STATUS_COLORS: StatusColors = {
    SOLD: "#79798a",
    SALE: "#57825e",
    RENT: "#bd9e39",
    RENTED: "#3e78c2",
    UNAVAILABLE: "#c72c2e",
    TAKEN: "#7d673e",
    UNDER_CONSTRUCTION: "#A300D8",
    UNDER_MAINTENANCE: "#E0067C",
};

function statusColor(params: GridCellParams) {
    if (!params.value) return <></>;

    const value = params.value as KeyValue;
    const status = (value.value as string)?.trim();

    if (!value || !status) return <></>;

    const statusForColor = (value.key as string)?.trim();
    const statusUpper = statusForColor?.toUpperCase() as PropertyStatus;

    const color = STATUS_COLORS[statusUpper] || "#537f91"; // default color if status is not recognized

    return (
        <Box
            sx={{
                width: 150,
                height: 30,
                bgcolor: color,
                color: "white",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {status}
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
        renderCell: renderImage,

        flex: 1,
    },
    {
        field: "code",
        headerName: t("Code") as string,
        headerAlign: "center",
        align: "center",

        flex: 1,
    },
    {
        field: "parentCategory",
        align: "center",
        headerAlign: "center",
        headerName: t("Parent Category") as string,
        renderCell: (params) => (params.value as KeyValue)?.value,

        flex: 1,
    },
    {
        field: "category",
        align: "center",
        headerAlign: "center",
        headerName: t("Category") as string,
        renderCell: (params) => (params.value as KeyValue)?.value,

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

        flex: 1,
    },
    {
        field: "state",
        headerAlign: "center",
        align: "center",
        headerName: t("State") as string,
        renderCell: statusColor,

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

        flex: 1,
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
        field: "createdAt",
        headerAlign: "center",
        align: "center",
        headerName: t("Creation Date") as string,

        flex: 1,

        renderCell: (params) => {
            const { i18n } = useTranslation();
            const date = new Date(params.value);

            return i18n.language === "el"
                ? date.toLocaleDateString("el-GR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                  })
                : date.toDateString();
        },
    },
    {
        field: "updatedAt",
        headerAlign: "center",
        align: "center",
        headerName: t("Updated At") as string,

        flex: 1,

        renderCell: (params) => {
            const { i18n } = useTranslation();
            const date = new Date(params.value);

            return i18n.language === "el"
                ? date.toLocaleDateString("el-GR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                  })
                : date.toDateString();
        },
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
