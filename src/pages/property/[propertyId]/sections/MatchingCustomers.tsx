import {
    Avatar,
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
import { UserCircle } from "src/icons/user-circle";
import { useGetCustomerByIdQuery } from "src/services/customers";
import nomoi from "src/json/nomoi.json";
import {
    useGetPropertyByIdQuery,
    useSuggestForCustomerQuery,
    useSuggestForPropertyQuery,
} from "src/services/properties";
import { IProperties } from "src/types/properties";
import { ILabel } from "src/types/label";
import ListLabelsItem from "src/components/List/labels-item";
import { TypeLabels } from "src/pages/customer/index.page";

const pageSize = 5;

const MatchingCustomersSection: React.FC = () => {
    // return <>Im waiting BE nearly made it </>;
    const router = useRouter();
    const { t } = useTranslation();

    const { isLoaded } = useLoadApi(); // google maps api
    const { customerId } = router.query;
    const { propertyId } = router.query;
    const [page, setPage] = useState(0);
    const [parentCategory, setParentCategory] = useState<string[]>([]);

    const { data: property, isSuccess } = useGetPropertyByIdQuery(+propertyId!);

    const { data: customersPage } = useSuggestForPropertyQuery(
        // εδώ πρέπει να φτιάξω καινούριο query useSuggestForPropertyQuery
        { propertyId: +propertyId!, page, pageSize },
        {
            skip: !parentCategory,
        }
    );
    const totalRows = useMemo(
        () => customersPage?.totalElements,
        [customersPage?.totalElements]
    );

    const customers = useMemo(() => {
        if (!isLoaded) return [];
        if (!customersPage?.content) return [];
        return (
            // (shapeData
            //     ? filterPropertiesInShape(propertiesPage?.content, shapeData) // edw den exoume pali shape
            customersPage?.content || []
        );
    }, [isLoaded, customersPage]);
    console.log("customers consoleee:", customers);
    //    .?????? xreiazetai`?
    // useEffect(() => {
    //     if (!customer || !isSuccess) return;

    //     setParentCategory(customer?.demand?.filters?.parentCategories);
    // }, [customer, isSuccess]);
    ////////////////////////////////////////
    function showLabel(params: GridCellParams) {
        if (!params.value || !Array.isArray(params.value)) return <></>;

        const labels: ILabel[] = params.value as ILabel[];

        return (
            <div style={{ display: "flex", justifyContent: "center" }}>
                <ListLabelsItem labels={labels} label={""} />
            </div>
        );
    }
    function statusColor(params: GridCellParams) {
        const labels = (
            <TypeLabels
                seller={params.row.seller}
                lessor={params.row.lessor}
                leaser={params.row.leaser}
                buyer={params.row.buyer}
            />
        );

        return <div>{labels}</div>;
    }
    const columns: GridColDef[] = [
        {
            field: "image",
            headerName: "",
            renderCell: (params: GridCellParams) => {
                const firstName = params.row.firstName;
                const lastName = params.row.lastName;

                return (firstName && lastName) || firstName || lastName ? (
                    <Avatar>
                        {firstName[0]}
                        {lastName[0]}
                    </Avatar>
                ) : (
                    <Avatar>
                        <UserCircle />
                    </Avatar>
                );
            },
        },

        {
            field: "firstName",
            headerName: t("First Name") || "",
            width: 180,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "lastName",
            headerName: t("Last Name") || "",
            width: 180,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "mobilePhone",
            headerName: t("Mobile Phone") || "",
            width: 180,
            headerAlign: "center",
            align: "center",
        },

        {
            field: "city",
            headerName: t("City") || "",
            width: 180,
            headerAlign: "center",
            align: "center",
            renderCell: (params: GridCellParams) => {
                const city = useMemo(() => {
                    if (!params.row.city) return "";
                    const isNumberString = (input: string): boolean =>
                        !isNaN(Number(input));
                    return isNumberString(params.row.city)
                        ? nomoi.filter(
                              (o) => o["Area ID"] === params.row.city
                          )[0]["Name GR"]
                        : params.row.city;
                }, [params.row.city]);
                return <div>{city}</div>;
            },
        },
        {
            field: "category",
            width: 180,
            headerAlign: "center",
            align: "center",
            headerName: t("Category") || "",
            renderCell: statusColor,
        },
        {
            field: "labels",
            width: 180,
            headerAlign: "center",
            align: "center",
            headerName: t("Labels") || "",
            renderCell: showLabel,
        },
    ];

    const handlePaginationChange = (model: GridPaginationModel) =>
        setPage(model.page);

    if (!parentCategory) return null;
    if (customers?.length === 0) {
        // !propertiesPage ||
        // !Array.isArray(propertiesPage.content) ||
        // propertiesPage.content.length === 0
        return (
            <Container
                style={{
                    height: "50vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "top",
                }}
            >
                <Grid
                    container
                    direction="column"
                    alignItems="center"
                    spacing={2}
                >
                    <Grid item>
                        <span style={{ fontSize: "50px" }}>👤</span>
                    </Grid>
                    <Grid item>
                        <Typography
                            variant="h5"
                            style={{
                                textAlign: "center",
                                color: "rgba(0, 0, 0, 0.7)",
                            }}
                        >
                            {t("There are no matching Customers")}
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        );
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
                <Typography variant="h6">{t("Matching Customers")}</Typography>
            </Box>
            <Divider></Divider>
            <Grid container>
                <Grid item xs={12}>
                    <Paper>
                        <DataGridTable
                            rows={customers}
                            columns={columns}
                            resource={"customer"}
                            sortingBy={"firstName"}
                            sortingOrder={"asc"}
                            page={page}
                            pageSize={pageSize}
                            totalRows={totalRows}
                            onPaginationModelChange={handlePaginationChange}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default MatchingCustomersSection;
