import {
    GridCallbackDetails,
    GridColDef,
    GridDeleteIcon,
    GridPaginationModel,
    GridRowSelectionModel,
    GridRowsProp,
    GridSortDirection,
    GridSortModel,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarExport,
} from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import { FC, useMemo, useState } from "react";
import { StyledDataGrid } from "./styles";
import { Button } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useTranslation } from "react-i18next";

type GridProps = {
    rows: GridRowsProp;
    columns: GridColDef[];

    sortingBy: string | null;
    sortingOrder: string | null;

    page: number;
    pageSize: number;
    totalRows?: number;
    onPaginationModelChange?: (
        model: GridPaginationModel,
        details: GridCallbackDetails
    ) => void;

    onBulkDelete?: (selectedRows: GridRowSelectionModel) => void;
    onBulkEdit?: (selectedRows: GridRowSelectionModel) => void;

    resource?: string;
};

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
}) => {
    const router = useRouter();
    const { t } = useTranslation();
    const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([]);
    const [sortModel, setSortModel] = useState<GridSortModel>([]);

    useMemo(() => {
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
                        <BulkDeleteButton />
                        <BulkEditButton />
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
                sx={{
                    "& .MuiDataGrid-row": {
                        cursor: "pointer",
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
                onRowClick={(e) => router.push(`/${resource}/${e.row.id}`)}
                checkboxSelection
                autoHeight
                disableRowSelectionOnClick
                sortModel={sortModel}
                onSortModelChange={handleSortChange}
                rows={rows}
                columns={columns}
                pageSizeOptions={[25, 50, 100]}
            />
        </>
    );
};

export default DataGridTable;
