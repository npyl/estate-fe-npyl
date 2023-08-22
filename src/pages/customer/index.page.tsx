import { Box, Paper, Skeleton, Avatar } from "@mui/material";
import {
    GridCellParams,
    GridColDef,
    GridRowSelectionModel,
} from "@mui/x-data-grid";
import type { NextPage } from "next";
import { useEffect, useMemo, useState } from "react";
import DataGridTable from "src/components/DataGrid";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import {
    useDeleteCustomerMutation,
    useFilterCustomersMutation,
} from "src/services/customers";
import { FilterSection } from "./components";
import nomoi from "src/json/nomoi.json";
import { useSelector } from "react-redux";
import { selectAll } from "src/slices/customer/filters";
import { UserCircle } from "src/icons/user-circle";
import { DeleteDialog } from "src/components/Dialog/Delete";
import { BulkEdit } from "./components/BulkEdit/BulkEdit";
import { usePublishTab } from "src/components/Tabs/utils";
import { useTranslation } from "react-i18next";

const Customers: NextPage = () => {
    usePublishTab({ title: "Customers", path: "/customer" });

    const allFilters = useSelector(selectAll);

    const [bulkEditOpen, setBulkEditOpen] = useState(false);
    const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);
    const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([]);
    const { t } = useTranslation();
    // page
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(25);

    const [deleteCustomer] = useDeleteCustomerMutation();
    const [filterCustomers, { isLoading, data }] = useFilterCustomersMutation();
    const columns: GridColDef[] = [
        {
            field: "image",
            headerName: t("Image") || "",
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
        },
        {
            field: "lastName",
            headerName: t("Last Name") || "",
            width: 180,
        },
        {
            field: "mobilePhone",
            headerName: t("Mobile Phone") || "",
            width: 180,
        },
        {
            field: "city",
            headerName: t("City") || "",
            width: 180,
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
    ];
    useEffect(() => {
        revalidate();
    }, [allFilters, page, pageSize]);

    const rows = useMemo(() => data?.content || [], [data?.content]);

    const revalidate = () => {
        filterCustomers({
            filter: allFilters,
            page: page,
            pageSize: pageSize,
        });
    };

    const renderSkeletonCell = () => <Skeleton width={150} animation="wave" />;
    const skeletonRows = Array.from({ length: 2 }, (_, index) => ({
        id: index + 1,
    }));

    const openBulkDeleteDialog = (selectedRows: GridRowSelectionModel) => {
        setBulkDeleteDialogOpen(true);
        setSelectedRows(selectedRows);
    };
    const closeBulkDeleteDialog = () => setBulkDeleteDialogOpen(false);
    const handleBulkDelete = () => {
        closeBulkDeleteDialog();

        Promise.all(selectedRows.map((id) => deleteCustomer(+id))).then(() =>
            revalidate()
        );
    };

    const openBulkEdit = (selectedRows: GridRowSelectionModel) => {
        setBulkEditOpen(true);
        setSelectedRows(selectedRows);
    };
    const closeBulkEdit = () => setBulkEditOpen(false);
    const handleBulkEditSave = () => revalidate();

    return (
        <Box
            sx={{
                flexGrow: 1,
                position: "relative",
                height: "100%", // make sure height is full so that bulk edit is full even if DataGrid is small
            }}
        >
            <FilterSection
                sx={{
                    marginRight: bulkEditOpen ? 40 : 0,
                }}
            />

            <Paper sx={{ mt: 1, marginRight: bulkEditOpen ? 40 : 0 }}>
                {rows ? (
                    <DataGridTable
                        rows={rows}
                        columns={columns}
                        resource={"customer"}
                        sortingBy={"firstName"}
                        sortingOrder={"asc"}
                        page={0}
                        pageSize={25}
                        totalRows={25}
                        onBulkEdit={openBulkEdit}
                        onBulkDelete={openBulkDeleteDialog}
                    />
                ) : (
                    <DataGridTable
                        rows={skeletonRows}
                        columns={columns.map((column) => ({
                            ...column,
                            renderCell: renderSkeletonCell,
                        }))}
                        sortingBy={""}
                        sortingOrder={"asc"}
                        page={0}
                        pageSize={25}
                        totalRows={25}
                    />
                )}
            </Paper>

            <BulkEdit
                open={bulkEditOpen}
                selectedIds={selectedRows.map((row) => +row)}
                onSave={handleBulkEditSave}
                onClose={closeBulkEdit}
            />

            <DeleteDialog
                multiple
                open={bulkDeleteDialogOpen}
                onClose={closeBulkDeleteDialog}
                onDelete={handleBulkDelete}
            />
        </Box>
    );
};

Customers.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default Customers;
