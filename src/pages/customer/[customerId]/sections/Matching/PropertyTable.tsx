import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";
import {
    GridCellParams,
    GridColDef,
    GridPaginationModel,
} from "@mui/x-data-grid";
import { useMemo } from "react";
import DataGridTable from "src/components/DataGrid";
import Image from "src/components/image";
import { KeyValue } from "src/types/KeyValue";
import { IProperties } from "src/types/properties";
import { TranslationType } from "src/types/translation";

interface PropertyTableProps {
    rows: IProperties[];
    page: number;
    pageSize: number;
    totalRows: number;
    onPaginationChange: (model: GridPaginationModel) => void;
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
    const status = value?.key?.trim();

    if (!value || !status) return <></>;

    const statusUpper = status?.toUpperCase() as PropertyStatus;
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

const renderImage = (params: GridCellParams) => (
    <Image src={`${params.formattedValue}` || ""} alt="" ratio="16/9" />
);

const getColumns = (t: TranslationType): GridColDef[] => [
    {
        field: "propertyImageUrl",
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
    {
        field: "price",
        width: 180,
        headerAlign: "center",
        align: "center",
        headerName: t("Price") || "",
        renderCell: (params: GridCellParams) => {
            return params.value ? `${params.value} €` : "";
        },
    },
    {
        field: "state",
        headerAlign: "center",
        width: 180,
        align: "center",
        headerName: t("Status") || "",
        renderCell: statusColor,
    },
    {
        field: "area",
        width: 180,
        headerAlign: "center",
        align: "center",
        headerName: t("Area") || "",
        renderCell: (params: GridCellParams) => {
            return params.value ? `${params.value} m²` : "";
        },
    },
];

const PropertyTable = ({
    rows,
    page,
    pageSize,
    totalRows,
    onPaginationChange,
}: PropertyTableProps) => {
    const { t } = useTranslation();

    const columns = useMemo(() => getColumns(t), [t]);

    return (
        <DataGridTable
            rows={rows}
            columns={columns}
            resource="property"
            sortingBy={"firstName"}
            sortingOrder={"asc"}
            page={page}
            pageSize={pageSize}
            totalRows={totalRows}
            onPaginationModelChange={onPaginationChange}
        />
    );
};

export default PropertyTable;
