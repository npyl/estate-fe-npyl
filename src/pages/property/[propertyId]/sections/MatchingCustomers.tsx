import {
    Box,
    Container,
    Divider,
    Grid,
    Paper,
    Typography,
} from "@mui/material";
import {
    GridCellParams,
    GridColDef,
    GridPaginationModel,
} from "@mui/x-data-grid";
import { useRouter } from "next/router";
import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import DataGridTable from "src/components/DataGrid";
import { useLoadApi } from "src/components/Map/Map";
import { ShapeData } from "src/components/Map/types";
import { decodeShape, isPointInsideShapeData } from "src/components/Map/util";
import Image from "src/components/image";
import { useGetCustomerByIdQuery } from "src/services/customers";
import {
    useGetPropertyByIdQuery,
    useSuggestForCustomerQuery,
} from "src/services/properties";
import { IProperties } from "src/types/properties";

const filterPropertiesInShape = (
    properties: IProperties[],
    shapeData: ShapeData
): IProperties[] =>
    properties.filter(
        (p) =>
            p.location?.lat &&
            p.location?.lng &&
            isPointInsideShapeData(p.location.lat, p.location.lng, shapeData)
    );

const pageSize = 5;

const MatchingCustomersSection: React.FC = () => {
    return <>Im waiting BE nearly made it </>;
    // const router = useRouter();
    // const { t } = useTranslation();

    // const { isLoaded } = useLoadApi(); // google maps api
    // const { customerId } = router.query;
    // const { propertyId } = router.query;
    // const [page, setPage] = useState(0);
    // const [parentCategory, setParentCategory] = useState<string[]>([]);

    // // const { data: customer, isSuccess } = useGetCustomerByIdQuery(+customerId!);
    // const { data: property, isSuccess } = useGetPropertyByIdQuery(+propertyId!);
    // // const { data: propertiesPage } = useSuggestForCustomerQuery(
    // //     { customerId: +customerId!, page, pageSize },
    // //     {
    // //         skip: !parentCategory,
    // //     }
    // // );
    // const { data: customersPage } = useSuggestForCustomerQuery(
    //     // εδώ πρέπει να φτιάξω καινούριο query useSuggestForPropertyQuery
    //     { propertyId: +propertyId!, page, pageSize },
    //     {
    //         skip: !parentCategory,
    //     }
    // );

    // // const shape = useMemo(() => customer?.demand?.shape, [customer]); den yparxei shape sto property isws thelei location?
    // // const shapeData = useMemo(() => (shape ? decodeShape(shape) : ""), [shape]);

    // // const totalRows = useMemo(
    // //     () => propertiesPage?.totalElements,
    // //     [propertiesPage?.totalElements]
    // // );
    // const totalRows = useMemo(
    //     () => customersPage?.totalElements,
    //     [customersPage?.totalElements]
    // );

    // // const properties = useMemo(() => {
    // //     if (!isLoaded) return [];
    // //     if (!propertiesPage?.content) return [];
    // //     return (
    // //         (shapeData
    // //             ? filterPropertiesInShape(propertiesPage?.content, shapeData)
    // //             : propertiesPage?.content) || []
    // //     );
    // // }, [isLoaded, shapeData, propertiesPage]);
    // const customers = useMemo(() => {
    //     if (!isLoaded) return [];
    //     if (!customersPage?.content) return [];
    //     return (
    //         // (shapeData
    //         //     ? filterPropertiesInShape(propertiesPage?.content, shapeData) // edw den exoume pali shape
    //         customersPage?.content || []
    //     );
    // }, [isLoaded, customersPage]);
    // //    .?????? xreiazetai`?
    // // useEffect(() => {
    // //     if (!customer || !isSuccess) return;

    // //     setParentCategory(customer?.demand?.filters?.parentCategories);
    // // }, [customer, isSuccess]);

    // const columns: GridColDef[] = [
    //     {
    //         field: "code",
    //         headerName: t("Reference ID") || "",
    //         width: 180,
    //         headerAlign: "center",

    //         align: "center",
    //     },
    //     {
    //         field: "parentCategory",
    //         headerName: t("Category") || "",
    //         width: 180,
    //         align: "center",
    //         headerAlign: "center",
    //     },
    //     {
    //         field: "category",
    //         headerName: t("Subcategory") || "",
    //         width: 180,
    //         align: "center",
    //         headerAlign: "center",
    //     },
    //     {
    //         field: "price",
    //         width: 180,
    //         headerAlign: "center",
    //         align: "center",
    //         headerName: t("Price") || "",
    //         renderCell: (params: GridCellParams) => {
    //             return params.value ? `${params.value} €` : "";
    //         },
    //     },

    //     {
    //         field: "area",
    //         width: 180,
    //         headerAlign: "center",
    //         align: "center",
    //         headerName: t("Area") || "",
    //         renderCell: (params: GridCellParams) => {
    //             return params.value ? `${params.value} m²` : "";
    //         },
    //     },
    // ];

    // const handlePaginationChange = (model: GridPaginationModel) =>
    //     setPage(model.page);

    // if (!parentCategory) return null;
    // if (customers?.length === 0) {
    //     // !propertiesPage ||
    //     // !Array.isArray(propertiesPage.content) ||
    //     // propertiesPage.content.length === 0
    //     return (
    //         <Container
    //             style={{
    //                 height: "50vh",
    //                 display: "flex",
    //                 alignItems: "center",
    //                 justifyContent: "top",
    //             }}
    //         >
    //             <Grid
    //                 container
    //                 direction="column"
    //                 alignItems="center"
    //                 spacing={2}
    //             >
    //                 <Grid item>
    //                     <span style={{ fontSize: "50px" }}>👤</span>
    //                 </Grid>
    //                 <Grid item>
    //                     <Typography
    //                         variant="h5"
    //                         style={{
    //                             textAlign: "center",
    //                             color: "rgba(0, 0, 0, 0.7)",
    //                         }}
    //                     >
    //                         {t("There are no matching Customers")}
    //                     </Typography>
    //                 </Grid>
    //             </Grid>
    //         </Container>
    //     );
    // }

    // return (
    //     <Paper
    //         elevation={10}
    //         sx={{
    //             overflow: "auto",
    //             padding: 0,
    //         }}
    //     >
    //         <Box
    //             sx={{
    //                 px: 3,
    //                 py: 1.5,
    //                 display: "flex",
    //                 justifyContent: "left",
    //             }}
    //         >
    //             <Typography variant="h6">{t("Matching Customers")}</Typography>
    //         </Box>
    //         <Divider></Divider>
    //         <Grid container>
    //             <Grid item xs={12}>
    //                 <Paper>
    //                     <DataGridTable
    //                         rows={customers}
    //                         columns={columns}
    //                         resource={"customer"}
    //                         sortingBy={"firstName"}
    //                         sortingOrder={"asc"}
    //                         page={page}
    //                         pageSize={pageSize}
    //                         totalRows={totalRows}
    //                         onPaginationModelChange={handlePaginationChange}
    //                     />
    //                 </Paper>
    //             </Grid>
    //         </Grid>
    //     </Paper>
    // );
};

export default MatchingCustomersSection;
