import EditNoteIcon from "@mui/icons-material/EditNote";
import { Button } from "@mui/material";
import {
    GridCallbackDetails,
    GridDeleteIcon,
    GridRowSelectionModel,
    GridSortDirection,
    GridSortModel,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarExport,
} from "@mui/x-data-grid";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyledDataGrid } from "./styles";
import GridProps from "./types";

const DataGridTable: FC<GridProps> = ({
    rows,
    columns,

    sortingBy,
    sortingOrder,

    page,
    pageSize,
    totalRows,
    onPaginationModelChange,

    onBulkDelete,
    onBulkEdit,

    resource = "property",

    ...props
}) => {
    const router = useRouter();
    const { t } = useTranslation();
    const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([]);
    const [sortModel, setSortModel] = useState<GridSortModel>([]);

    useEffect(() => {
        setSortModel([
            { field: sortingBy || "", sort: sortingOrder as GridSortDirection },
        ]);
    }, [sortingBy, sortingOrder]);

    const BulkEditButton = () => (
        <Button
            onClick={() => onBulkEdit?.(selectedRows)}
            startIcon={<EditNoteIcon />}
            sx={{ position: "absolute", right: 0, mr: 1, mt: 0.5 }}
        >
            {t("Edit")}
        </Button>
    );

    const BulkDeleteButton = () => (
        <Button
            startIcon={<GridDeleteIcon />}
            onClick={() => onBulkDelete?.(selectedRows)}
        >
            {t("Delete")}
        </Button>
    );

    const CustomToolbar = () => {
        const { t } = useTranslation();
        return (
            <GridToolbarContainer>
                <GridToolbarColumnsButton>
                    {t("Fields")}
                </GridToolbarColumnsButton>
                <GridToolbarExport>{t("Export")}</GridToolbarExport>

                {selectedRows && selectedRows.length > 0 && (
                    <>
                        {onBulkDelete && <BulkDeleteButton />}
                        {onBulkEdit && <BulkEditButton />}
                    </>
                )}
            </GridToolbarContainer>
        );
    };

    const handleSortChange = (newSortModel: any) => {
        setSortModel(newSortModel);
    };

    const handleRowSelectionChange = (
        model: GridRowSelectionModel,
        details: GridCallbackDetails<any>
    ) => {
        setSelectedRows(model);
    };

    return (
        <>
            <StyledDataGrid
                slots={{
                    toolbar: CustomToolbar,
                }}
                localeText={{
                    toolbarColumns: "Fields",
                    columnsPanelTextFieldLabel: "Search Field",
                    columnsPanelTextFieldPlaceholder: "Name of Fields",
                    // rowsPerPage: {t("rows Per Page")}
                    MuiTablePagination: {
                        labelRowsPerPage: t("Rows per page"),
                    },
                }}
                // --- selection ---
                onRowSelectionModelChange={handleRowSelectionChange}
                // --- pagination ---
                paginationMode="server"
                rowCount={totalRows}
                paginationModel={{ page, pageSize }}
                onPaginationModelChange={onPaginationModelChange}
                // ------------------
                disableColumnFilter
                disableDensitySelector
                rowHeight={100}
                getRowId={(e) => e.id}
                onRowClick={(e) => {
                    // Save the current scroll height to local storage
                    localStorage.setItem(
                        "scrollHeight",
                        window.scrollY.toString()
                    );

                    // Navigate to the next page
                    router.push(`/${resource}/${e.row.id}`);
                }}
                checkboxSelection
                autoHeight
                disableRowSelectionOnClick
                sortModel={sortModel}
                onSortModelChange={handleSortChange}
                rows={rows}
                columns={columns}
                pageSizeOptions={[25, 50, 100]}
                {...props}
            />
        </>
    );
};

export default DataGridTable;
