import EditNoteIcon from "@mui/icons-material/EditNote";
import { Button } from "@mui/material";
import MuiLink from "@mui/material/Link";
import {
    GridDeleteIcon,
    GridRowSelectionModel,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarExport,
    GridRow,
    GridRowProps,
    GridToolbarContainerProps,
    GridCallbackDetails,
} from "@mui/x-data-grid";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyledDataGrid } from "./styles";
import GridProps from "./types";

// ------------------------------------------------------------------------

interface CustomRowProps extends GridRowProps {
    resource: string;
}

const CustomRow = ({ resource, ...props }: CustomRowProps) => (
    <MuiLink
        href={`/${resource}/${props.row?.id}`}
        onClick={(event) => {
            // Prevent navigation if clicking on the checkbox
            event.target &&
                (event.target as HTMLElement).closest(
                    ".MuiDataGrid-checkboxInput"
                );
        }}
    >
        <GridRow {...props} />
    </MuiLink>
);

interface CustomToolbarProps extends GridToolbarContainerProps {
    haveSelectedRows: boolean;
    onBulkDelete?: VoidFunction;
    onBulkEdit?: VoidFunction;
}

const CustomToolbar = ({
    haveSelectedRows,
    onBulkDelete,
    onBulkEdit,
    ...props
}: CustomToolbarProps) => {
    const { t } = useTranslation();
    return (
        <GridToolbarContainer {...props}>
            <GridToolbarColumnsButton>{t("Fields")}</GridToolbarColumnsButton>
            <GridToolbarExport>{t("Export")}</GridToolbarExport>

            {haveSelectedRows ? (
                <>
                    {onBulkEdit ? (
                        <Button
                            onClick={onBulkEdit}
                            startIcon={<EditNoteIcon />}
                            sx={{
                                position: "absolute",
                                right: 0,
                                mr: 1,
                                mt: 0.5,
                            }}
                        >
                            {t("Edit")}
                        </Button>
                    ) : null}

                    {onBulkDelete ? (
                        <Button
                            startIcon={<GridDeleteIcon />}
                            onClick={onBulkDelete}
                        >
                            {t("Delete")}
                        </Button>
                    ) : null}
                </>
            ) : null}
        </GridToolbarContainer>
    );
};

// ------------------------------------------------------------------------

const DataGridTable: FC<GridProps> = ({
    rows,
    columns,
    page,
    pageSize,
    totalRows,
    onPaginationModelChange,
    onBulkDelete,
    onBulkEdit,
    resource = "property",
    ...props
}) => {
    const { t } = useTranslation();

    const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([]);

    const handleRowSelectionChange = (
        model: GridRowSelectionModel,
        details: GridCallbackDetails
    ) => {
        setSelectedRows(model);
        props.onRowSelectionModelChange?.(model, details);
    };

    return (
        <>
            <StyledDataGrid
                slots={{
                    toolbar: (props) => (
                        <CustomToolbar
                            {...props}
                            haveSelectedRows={selectedRows.length > 0}
                            onBulkEdit={
                                onBulkEdit
                                    ? () => onBulkEdit(selectedRows)
                                    : undefined
                            }
                            onBulkDelete={
                                onBulkDelete
                                    ? () => onBulkDelete(selectedRows)
                                    : undefined
                            }
                        />
                    ),
                    row: (props) => (
                        <CustomRow {...props} resource={resource} />
                    ),
                }}
                localeText={{
                    toolbarColumns: t("Fields"),
                    columnsPanelTextFieldLabel: "Search Field",
                    columnsPanelTextFieldPlaceholder: "Name of Fields",
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
                rowHeight={125}
                getRowId={(e) => e.id}
                onRowClick={(e) => {
                    // Save the current scroll height to local storage
                    localStorage.setItem(
                        "scrollHeight",
                        window.scrollY.toString()
                    );
                }}
                checkboxSelection
                disableRowSelectionOnClick
                autoHeight
                rows={rows}
                columns={columns}
                pageSizeOptions={[25, 50, 100]}
                {...props}
            />
        </>
    );
};

export default DataGridTable;
