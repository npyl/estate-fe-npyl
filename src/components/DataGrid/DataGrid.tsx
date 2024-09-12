import MuiLink from "@mui/material/Link";
import { GridRow, GridRowProps } from "@mui/x-data-grid";
import { FC } from "react";
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

// ------------------------------------------------------------------------

const DataGridTable: FC<GridProps> = ({
    rows,
    columns,
    page,
    pageSize,
    totalRows,
    resource = "property",
    ...props
}) => {
    const { t } = useTranslation();

    return (
        <StyledDataGrid
            slots={{
                row: (props) => <CustomRow {...props} resource={resource} />,
            }}
            localeText={{
                toolbarColumns: t("Fields"),
                columnsPanelTextFieldLabel: "Search Field",
                columnsPanelTextFieldPlaceholder: "Name of Fields",
                MuiTablePagination: {
                    labelRowsPerPage: t("Rows per page"),
                },
            }}
            // --- pagination ---
            paginationMode="server"
            rowCount={totalRows}
            paginationModel={{ page, pageSize }}
            // ------------------
            disableColumnFilter
            disableDensitySelector
            rowHeight={125}
            getRowId={(e) => e.id as number}
            onRowClick={(e) => {
                // Save the current scroll height to local storage
                localStorage.setItem("scrollHeight", window.scrollY.toString());
            }}
            checkboxSelection
            disableRowSelectionOnClick
            autoHeight
            rows={rows}
            columns={columns}
            pageSizeOptions={[25, 50, 100]}
            {...props}
        />
    );
};

export default DataGridTable;
