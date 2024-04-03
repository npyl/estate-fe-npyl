import { Box } from "@mui/material";
import { GridCellParams, GridColDef } from "@mui/x-data-grid";
import Image from "src/components/image";
import { KeyValue } from "src/types/KeyValue";
import { TranslationType } from "@/types/translation";
import RenderLabelsCell from "../shared/RenderLabels";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

const defaultImage = "/static/noImage.png";

function renderImage(params: GridCellParams) {
    if (params.formattedValue) {
        return (
            <>
                <Image
                    src={`${params.formattedValue}` || ""}
                    alt=""
                    ratio="16/9"
                />
            </>
        );
    } else {
        return (
            <Image
                src={defaultImage} // Make sure 'defaultImage' is imported or defined in your file
                alt="Default image description"
                ratio="16/9"
            />
        );
    }
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
        flex: 1,
        align: "center",
        headerAlign: "center",
        renderCell: renderImage,
    },
    {
        field: "code",
        headerName: t("Code") as string,
        flex: 1,
        headerAlign: "center",
        align: "center",
    },
    {
        field: "parentCategory",
        flex: 1,
        align: "center",
        headerAlign: "center",
        headerName: t("Parent Category") as string,
        renderCell: (params) => (params.value as KeyValue)?.value,
    },
    {
        field: "category",
        flex: 1,
        align: "center",
        headerAlign: "center",
        headerName: t("Category") as string,
        renderCell: (params) => (params.value as KeyValue)?.value,
    },
    {
        field: "price",
        flex: 1,
        headerAlign: "center",
        align: "center",
        headerName: t("Price") as string,
        renderCell: (params: GridCellParams) => {
            const formattedPrice = formatNumberWithPeriod(params.value);
            return formattedPrice ? `${formattedPrice} €` : "";
        },
    },
    {
        field: "state",
        headerAlign: "center",
        flex: 1,
        align: "center",
        headerName: t("State") as string,
        renderCell: statusColor,
    },
    {
        field: "area",
        flex: 1,
        headerAlign: "center",
        align: "center",
        headerName: t("Area") as string,
        renderCell: (params: GridCellParams) => {
            return params.value ? `${params.value} m²` : "";
        },
    },
    {
        field: "labels",
        headerAlign: "center",
        flex: 1,
        align: "center",
        headerName: t("Labels") as string,
        renderCell: RenderLabelsCell,
    },
    {
        field: "createdAt",
        headerAlign: "center",
        flex: 1,
        align: "center",
        headerName: t("Creation Date") as string,
        renderCell: (params) => {
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
        flex: 1,
        align: "center",
        headerName: t("Updated At") as string,
        renderCell: (params) => {
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
