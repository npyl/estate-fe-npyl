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
import { useSelector } from "react-redux";
import { selectAll } from "src/slices/customer/filters";
import { UserCircle } from "src/icons/user-circle";
import { DeleteDialog } from "src/components/Dialog/Delete";

const columns: GridColDef[] = [
    {
        field: "image",
        headerName: "Image",
        renderCell: (params: GridCellParams) => {
            const firstName = params.row.firstName;
            const lastName = params.row.lastName;

            return firstName && lastName ? (
                <Avatar>
                    {firstName[0]}
                    {lastName[0]}
                </Avatar>
            ) : (
                <UserCircle />
            );
        },
    },
    {
        field: "firstName",
        headerName: "First Name",
        width: 180,
    },
    {
        field: "lastName",
        headerName: "Last Name",
        width: 180,
    },
    {
        field: "mobilePhone",
        headerName: "Mobile-Phone",
        width: 180,
    },
    {
        field: "city",
        headerName: "City",
        width: 180,
    },
];

const Customers: NextPage = () => {
    const allFilters = useSelector(selectAll);

    const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);
    const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([]);

    // page
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(25);

    const [deleteCustomer] = useDeleteCustomerMutation();
    const [filterCustomers, { isLoading, data }] = useFilterCustomersMutation();

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

    return (
        <>
            <FilterSection />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    pt: 2,
                }}
            >
                <Paper sx={{ mt: 2 }}>
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
            </Box>

            <DeleteDialog
                open={bulkDeleteDialogOpen}
                onClose={closeBulkDeleteDialog}
                onDelete={handleBulkDelete}
            />
        </>
    );
};

Customers.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default Customers;
