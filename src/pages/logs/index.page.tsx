import { Avatar, Box, Paper, Skeleton } from "@mui/material";
import {
    GridCallbackDetails,
    GridCellParams,
    GridColDef,
    GridPaginationModel,
    GridRowSelectionModel,
} from "@mui/x-data-grid";
import type { NextPage } from "next";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import DataGridTable from "src/components/DataGrid";
import { DeleteDialog } from "src/components/Dialog/Delete";
import ListLabelsItem from "src/components/List/labels-item";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { Label, LabelColor } from "src/components/label";
import { UserCircle } from "src/icons/user-circle";
import nomoi from "src/json/nomoi.json";
import {
    useBulkDeleteCustomersMutation,
    useFilterCustomersMutation,
} from "src/services/customers";
import { useGetAdmitLogsQuery } from "src/services/logs";
import { selectAll } from "src/slices/customer/filters";
import { ILabel } from "src/types/label";
import { ILogs } from "src/types/logs";

interface TypeProps {
    seller: boolean;
    lessor: boolean;
    leaser: boolean;
    buyer: boolean;
}

const Logs: NextPage = () => {
    const { t } = useTranslation();
    const allFilters = useSelector(selectAll);

    const [bulkEditOpen, setBulkEditOpen] = useState(false);
    const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);
    const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([]);
    const [sortingOrder, setSortingOrder] = useState("asc");
    // page
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(25);

    const [bulkDeleteCustomers] = useBulkDeleteCustomersMutation();
    const [filterCustomers, { isLoading, data }] = useFilterCustomersMutation();

    // const getAdmitLogs: ILogs[] = useGetAdmitLogsQuery().data || [];
    // console.log(getAdmitLogs);
    const totalRows = useMemo(
        () => (data?.totalElements ? data?.totalElements : 100000),
        [data?.totalElements]
    );

    useEffect(() => {
        revalidate();
    }, [allFilters, page, pageSize]);

    const revalidate = () => {
        filterCustomers({
            filter: allFilters,
            page: page,
            pageSize: pageSize,
        });
    };

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
    ];
    useEffect(() => {
        revalidate();
    }, [allFilters, page, pageSize]);

    const rows = useMemo(() => data?.content || [], [data?.content]);

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
        // INFO: bulk delete rows; By default the DataGrid looks for a customer named `id` when getting the rows, so selectedRow = id
        bulkDeleteCustomers(selectedRows.map((row) => +row)).then(() =>
            revalidate()
        );
    };
    const handlePaginationModelChange = (
        model: GridPaginationModel,
        details: GridCallbackDetails
    ) => {
        setPageSize(model.pageSize);
        setPage(model.page);
    };
    const openBulkEdit = (selectedRows: GridRowSelectionModel) => {
        setBulkEditOpen(true);
        setSelectedRows(selectedRows);
    };

    return (
        <Box
            sx={{
                position: "relative",
                height: "100%", // WARN: make sure height is full so that bulk edit is full even if DataGrid is small
            }}
        >
            its not ready dont panic
            <Paper sx={{ mt: 1, marginRight: bulkEditOpen ? 40 : 0 }}>
                {rows ? (
                    <DataGridTable
                        rows={rows}
                        columns={columns}
                        resource={"customer"}
                        sortingBy={"firstName"}
                        sortingOrder={sortingOrder}
                        page={page}
                        pageSize={pageSize}
                        totalRows={totalRows}
                        onPaginationModelChange={handlePaginationModelChange}
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
                        sortingOrder={sortingOrder}
                        page={page}
                        pageSize={pageSize}
                        totalRows={totalRows}
                        onPaginationModelChange={handlePaginationModelChange}
                    />
                )}
            </Paper>
        </Box>
    );
};

Logs.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default Logs;
