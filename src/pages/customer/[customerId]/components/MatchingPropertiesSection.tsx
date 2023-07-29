import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import { GridCellParams, GridColDef } from "@mui/x-data-grid";
import { useSuggestForCustomerQuery } from "src/services/properties";
import DataGridTable from "src/components/DataGrid";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import * as React from "react";
import Image from "src/components/image";

const MatchingPropertiesSection: React.FC = () => {
    const router = useRouter();
    const { t } = useTranslation();
    const { customerId } = router.query;
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
        if (!params.value) {
            return <></>;
        }
        const status = (params.value as string).trim();
        const statusUpper = status.toUpperCase() as PropertyStatus;
        // console.log("statusUpper:", statusUpper); // add this to debug the value
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
    function renderImage(params: GridCellParams) {
        return (
            <>
                <Image
                    src={`${params.formattedValue}` || ""}
                    alt=""
                    ratio="16/9"
                />
            </>
        );
    }

    const columns: GridColDef[] = [
        {
            field: "propertyImage",
            headerName: "Thumbnail",
            width: 180,
            align: "center",
            headerAlign: "center",
            renderCell: renderImage,
        },
        {
            field: "code",
            headerName: "Reference ID",
            width: 180,
            headerAlign: "center",

            align: "center",
        },
        {
            field: "parentCategory",
            width: 180,
            align: "center",
            headerAlign: "center",
            headerName: "Category",
        },
        {
            field: "category",
            width: 180,
            align: "center",
            headerAlign: "center",
            headerName: "Subcategory",
        },
        {
            field: "price",
            width: 180,
            headerAlign: "center",
            align: "center",
            headerName: "Price",
            renderCell: (params: GridCellParams) => {
                return params.value ? `${params.value} €` : "";
            },
        },
        {
            field: "state",
            headerAlign: "center",
            width: 180,
            align: "center",
            headerName: "Status",
            renderCell: statusColor,
        },
        {
            field: "area",
            width: 180,
            headerAlign: "center",
            align: "center",
            headerName: "Area",
            renderCell: (params: GridCellParams) => {
                return params.value ? `${params.value} m²` : "";
            },
        },
    ];

    const { data } = useSuggestForCustomerQuery(parseInt(customerId as string)); // basic details
    if (!data || !Array.isArray(data.content) || data.content.length === 0)
        return null;

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
            <Divider></Divider>
            <Grid container>
                <Grid item xs={12}>
                    <Paper>
                        <DataGridTable
                            rows={data?.content}
                            columns={columns}
                            resource={"property"}
                            sortingBy={"firstName"}
                            sortingOrder={"asc"}
                            page={0}
                            pageSize={10}
                            totalRows={10}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default MatchingPropertiesSection;
