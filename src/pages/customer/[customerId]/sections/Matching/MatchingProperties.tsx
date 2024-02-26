import { Box, Divider, Paper, Typography } from "@mui/material";
import {
    GridCellParams,
    GridColDef,
    GridPaginationModel,
} from "@mui/x-data-grid";
import * as React from "react";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import DataGridTable from "src/components/DataGrid";
import { useLoadApi } from "src/components/Map";
import { ShapeData } from "src/components/Map/types";
import { decodeShape, isPointInsideShapeData } from "src/components/Map/util";
import Image from "src/components/image";
import useGetCustomer from "src/hooks/customer/hook";
import { useSuggestForCustomerQuery } from "src/services/properties";
import { KeyValue } from "src/types/KeyValue";
import { IProperties } from "src/types/properties";
import { TranslationType } from "src/types/translation";
import Placeholder from "./Placeholder";

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

const filterPropertiesInShape = (
    properties: IProperties[],
    shapeData: ShapeData
): IProperties[] =>
    properties.filter(
        (p) =>
            !p.location?.lat ||
            !p.location?.lng ||
            isPointInsideShapeData(p.location?.lat, p.location?.lng, shapeData)
    );

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

const pageSize = 5;

const MatchingPropertiesSection: React.FC = () => {
    const { t } = useTranslation();

    const { isLoaded } = useLoadApi(); // google maps api

    const { customer, customerId } = useGetCustomer();

    const [page, setPage] = useState(0);

    const { data: propertiesPage } = useSuggestForCustomerQuery({
        customerId: +customerId!,
        page,
        pageSize,
    });

    const demands = useMemo(() => customer?.demands || [], [customer?.demands]);

    const totalRows = useMemo(
        () => propertiesPage?.totalElements || 1,
        [propertiesPage?.totalElements]
    );

    const properties = useMemo(() => {
        if (!isLoaded) return [];
        if (!propertiesPage?.content) return [];

        const haveNoShapes = demands?.every((demand) => {
            const shapes = demand?.shapes;
            if (!shapes) return true; // every
            return shapes.every((shape) => !shape);
        });

        // If we have no shapes in our demands; return just the content from the backend
        if (haveNoShapes) return propertiesPage.content;

        // Otherwise, for every demand
        const res = demands
            ?.map((demand) => {
                // Get all shapes
                const shapes = demand?.shapes;
                return shapes
                    ?.map((shape) => {
                        // For every shape
                        const shapeData = decodeShape(shape);

                        // Return filtered properties
                        return shapeData
                            ? filterPropertiesInShape(
                                  propertiesPage?.content,
                                  shapeData
                              )
                            : [];
                    })
                    .flat();
            })
            .flat();

        // Keep only the unique entries
        return [...new Set(res)];
    }, [isLoaded, propertiesPage, demands]);

    const columns = useMemo(() => getColumns(t), [t]);

    const handlePaginationChange = useCallback(
        (model: GridPaginationModel) => setPage(model.page),
        []
    );

    if (properties?.length === 0) {
        return <Placeholder />;
    }

    return (
        <Paper
            elevation={10}
            sx={{
                overflow: "auto",
                padding: 0,
            }}
        >
            <Box
                sx={{
                    px: 3,
                    py: 1.5,
                    display: "flex",
                    justifyContent: "left",
                }}
            >
                <Typography variant="h6">{t("Matching Properties")}</Typography>
            </Box>
            <Divider />
            <DataGridTable
                rows={properties || []}
                columns={columns}
                resource={"property"}
                sortingBy={"firstName"}
                sortingOrder={"asc"}
                page={page}
                pageSize={pageSize}
                totalRows={totalRows}
                onPaginationModelChange={handlePaginationChange}
            />
        </Paper>
    );
};

export default MatchingPropertiesSection;
