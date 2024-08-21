import { Box, Paper, Button } from "@mui/material";
import {
    GridCallbackDetails,
    GridPaginationModel,
    GridRowSelectionModel,
} from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import useLocalStorageScrollRestore from "src/hooks/useLocalStorageScrollRestore";
import {
    useBulkDeletePropertiesMutation,
    useFilterPropertiesMutation,
} from "src/services/properties";
import { selectAll } from "src/slices/filters";
import DataGrid from "@/components/DataGrid/Property";
import { BulkEdit } from "../../components/BulkEdit/BulkEdit";
import DeleteIcon from "@mui/icons-material/Delete";

interface ViewAllProps {
    sortBy: string;
    direction: string;
    isBulkEditOpen: boolean;
    onBulkEditOpen: VoidFunction;
    onBulkEditClose: VoidFunction;
}

const ViewAll = ({
    sortBy,
    direction,
    isBulkEditOpen,
    onBulkEditOpen,
    onBulkEditClose,
}: ViewAllProps) => {
    const { t } = useTranslation();

    const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);
    const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([]);

    // Pagination
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(25);

    const allFilters = useSelector(selectAll);

    const [bulkDeleteProperties, { isLoading: isDeleting }] =
        useBulkDeletePropertiesMutation();
    const [filterProperties, { isLoading, data }] =
        useFilterPropertiesMutation();

    // Internal revalidation logic
    const revalidate = () => {
        filterProperties({
            filter: allFilters,
            page,
            pageSize,
            sortBy,
            direction,
        });
    };

    useEffect(() => {
        revalidate();
    }, [filterProperties, allFilters, page, pageSize, sortBy, direction]);

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

    const handleBulkEditSave = () => revalidate(); // Revalidate after bulk edit

    // Bulk Delete
    const handleBulkDelete = () => {
        if (selectedRows.length === 0) return;

        try {
            bulkDeleteProperties(selectedRows as number[]).unwrap();
            setSelectedRows([]);
            revalidate(); // Revalidate after deletion to refresh the datagrid
        } catch (error) {
            console.error("Failed to delete properties:", error);
        }
    };

    const handleRowSelectionModelChange = (
        selectionModel: GridRowSelectionModel
    ) => {
        setSelectedRows(selectionModel);
    };

    return (
        <Box
            sx={{
                position: "relative",
                height: "100%",
            }}
        >
            <Box display="flex" justifyContent="flex-end" p={1}>
                {selectedRows && selectedRows.length > 0 ? (
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleBulkDelete}
                        startIcon={<DeleteIcon />}
                    >
                        {t("Delete")}
                    </Button>
                ) : null}
            </Box>

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
                            page={page}
                            pageSize={pageSize}
                            totalRows={totalRows}
                            onPaginationModelChange={
                                handlePaginationModelChange
                            }
                            checkboxSelection
                            onRowSelectionModelChange={
                                handleRowSelectionModelChange
                            }
                            onBulkDelete={handleBulkDelete}
                            onBulkEdit={handleBulkEdit}
                        />
                    </Paper>
                </>
            ) : (
                <Paper sx={{ mt: 2 }}>
                    <DataGrid
                        skeleton
                        page={page}
                        pageSize={pageSize}
                        checkboxSelection
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
        </Box>
    );
};

export default ViewAll;
