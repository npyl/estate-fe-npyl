import { Box, Paper, Skeleton, Avatar } from "@mui/material";
import {
    GridCallbackDetails,
    GridCellParams,
    GridColDef,
    GridPaginationModel,
    GridRowSelectionModel,
} from "@mui/x-data-grid";
import type { NextPage } from "next";
import { useEffect, useMemo, useState } from "react";
import DataGridTable from "src/components/DataGrid";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import {
    useBulkDeleteCustomersMutation,
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
import { Label, LabelColor } from "src/components/label";
import ListLabelsItem from "src/components/List/labels-item";
import { ILabel } from "src/types/label";
interface TypeProps {
    seller: boolean;
    lessor: boolean;
    leaser: boolean;
    buyer: boolean;
}

const TypeLabels = ({ seller, lessor, leaser, buyer }: TypeProps) => {
    const { t } = useTranslation();

    const map = useMemo(
        () => ({
            ["Seller"]: {
                value: seller,
                color: "success",
            },
            ["Lessor"]: {
                value: lessor,
                color: "error",
            },
            ["Leaser"]: {
                value: leaser,
                color: "warning",
            },
            ["Buyer"]: {
                value: buyer,
                color: "info",
            },
        }),
        [seller, lessor, leaser, buyer]
    );

    return (
        <>
            {Object.entries(map).map(([type, { value, color }]) =>
                value ? (
                    <Label
                        key={type}
                        variant="soft"
                        opaque
                        color={color as LabelColor}
                    >
                        {t(type)}
                    </Label>
                ) : null
            )}
        </>
    );
};
{
}
const Customers: NextPage = () => {
    const { t } = useTranslation();
    usePublishTab({ title: "Customers", path: "/customer" });

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
    function showLabel(params: GridCellParams) {
        if (!params.value || !Array.isArray(params.value)) return <></>;

        const labels: ILabel[] = params.value as ILabel[];

        return <ListLabelsItem labels={labels} label={""} />;
    }
    const handlePaginationModelChange = (
        model: GridPaginationModel,
        details: GridCallbackDetails
    ) => {
        setPageSize(model.pageSize);
        setPage(model.page);
    };
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

    function labels(params: GridCellParams) {
        const label = (
            <ListLabelsItem
                labels={params.row.labels || "-"}
                label={""}
            ></ListLabelsItem>
        );
        return <div>{label}</div>;
    }

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

    const openBulkEdit = (selectedRows: GridRowSelectionModel) => {
        setBulkEditOpen(true);
        setSelectedRows(selectedRows);
    };
    const closeBulkEdit = () => setBulkEditOpen(false);
    const handleBulkEditSave = () => revalidate();

    return (
        <Box
            sx={{
                position: "relative",
                height: "100%", // WARN: make sure height is full so that bulk edit is full even if DataGrid is small
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
