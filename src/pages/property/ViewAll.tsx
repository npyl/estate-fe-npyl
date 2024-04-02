import { Box, Paper } from "@mui/material";
import {
    GridCallbackDetails,
    GridPaginationModel,
    GridRowSelectionModel,
} from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { DeleteDialog } from "src/components/Dialog/Delete";
import useLocalStorageScrollRestore from "src/hooks/useLocalStorageScrollRestore";
import {
    useBulkDeletePropertiesMutation,
    useFilterPropertiesMutation,
} from "src/services/properties";
import { selectAll } from "src/slices/filters";
import DataGrid from "@/components/DataGrid/Property";
import { BulkEdit } from "../components/BulkEdit/BulkEdit";

interface ViewAllProps {
    sortingBy: string;
    sortingOrder: string;
    // ...
    isBulkEditOpen: boolean;
    onBulkEditOpen: VoidFunction;
    onBulkEditClose: VoidFunction;
}

const ViewAll = ({
    sortingBy,
    sortingOrder,
    // ...
    isBulkEditOpen,
    onBulkEditOpen,
    onBulkEditClose,
}: ViewAllProps) => {
    const { t } = useTranslation();

    const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);
    const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([]);

    // pagination
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(25);

    const allFilters = useSelector(selectAll);

    const [bulkDeleteProperties] = useBulkDeletePropertiesMutation();
    const [filterProperties, { isLoading, data }] =
        useFilterPropertiesMutation();

    const revalidate = () => {
        filterProperties({
            filter: allFilters,
            page: page,
            pageSize: pageSize,
        });
    };

    useEffect(() => {
        revalidate();
    }, [allFilters, page, pageSize]);

    const rows = useMemo(() => {
        return data?.content ? data?.content : [];
    }, [data?.content]);

    const totalRows = useMemo(
        () => (data?.totalElements ? data?.totalElements : 100000),
        [data?.totalElements]
    );

    useLocalStorageScrollRestore();

    useEffect(() => {
        const storedPagination = localStorage.getItem(
            "propertyPaginationState"
        );

        if (storedPagination) {
            const parsedPagination = JSON.parse(storedPagination);
            if (page !== parsedPagination.page) {
                setPage(parsedPagination.page);
            }
        }
    }, []);

    const handlePaginationModelChange = (
        model: GridPaginationModel,
        details: GridCallbackDetails
    ) => {
        setPageSize(model.pageSize);
        setPage(model.page);
        const paginationState = { page: model.page };
        localStorage.setItem(
            "propertyPaginationState",
            JSON.stringify(paginationState)
        );
    };

    // Bulk Edit
    const handleBulkEdit = (selectedRows: GridRowSelectionModel) => {
        onBulkEditOpen();
        setSelectedRows(selectedRows);
    };

    const handleBulkEditSave = () => revalidate();

    // Bulk Delete
    const openBulkDeleteDialog = (selectedRows: GridRowSelectionModel) => {
        setBulkDeleteDialogOpen(true);
        setSelectedRows(selectedRows);
    };
    const closeBulkDeleteDialog = () => setBulkDeleteDialogOpen(false);
    const handleBulkDelete = () => {
        closeBulkDeleteDialog();
        // INFO: bulk delete rows; By default the DataGrid looks for a property named `id` when getting the rows, so selectedRow = id
        bulkDeleteProperties(selectedRows.map((row) => +row)).then(() =>
            revalidate()
        );
    };

    return (
        <Box
            sx={{
                position: "relative",
                height: "100%", // WARN: make sure height is full so that bulk edit is full even if DataGrid is small
            }}
        >
            {rows && !isLoading ? (
                <>
                    <Paper
                        sx={{ mt: 1 }}
                        style={{
                            marginRight: isBulkEditOpen ? 320 : 0,
                        }}
                    >
                        <DataGrid
                            rows={rows}
                            sortingBy={sortingBy}
                            sortingOrder={sortingOrder}
                            page={page}
                            pageSize={pageSize}
                            totalRows={totalRows}
                            onPaginationModelChange={
                                handlePaginationModelChange
                            }
                            onBulkDelete={openBulkDeleteDialog}
                            onBulkEdit={handleBulkEdit}
                        />
                    </Paper>
                </>
            ) : (
                <Paper sx={{ mt: 2 }}>
                    <DataGrid
                        skeleton
                        sortingBy={sortingBy}
                        sortingOrder={sortingOrder}
                        page={page}
                        pageSize={pageSize}
                        totalRows={totalRows}
                        onPaginationModelChange={handlePaginationModelChange}
                    />
                </Paper>
            )}

            <BulkEdit
                open={isBulkEditOpen}
                selectedIds={selectedRows.map((row) => +row)}
                onSave={handleBulkEditSave}
                onClose={onBulkEditClose}
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

export default ViewAll;
