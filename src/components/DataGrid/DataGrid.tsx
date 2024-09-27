import { FC } from "react";
import { useTranslation } from "react-i18next";
import { StyledDataGrid } from "./styles";
import GridProps from "./types";
import CustomRow from "./Row";

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
            slotProps={{
                // NOTE: fixes checkbox click bubbling until caught by row's NextLink
                baseCheckbox: {
                    onClick: (e) => e.stopPropagation(),
                },
            }}
            localeText={{
                toolbarColumns: t("Fields"),
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
            disableColumnSorting
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
            // ...
            {...props}
        />
    );
};

export default DataGridTable;
