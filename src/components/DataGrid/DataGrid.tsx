import { FC, useMemo } from "react";
import { StyledDataGrid } from "./styles";
import GridProps from "./types";
import CustomRow from "./Row";
import renderSkeletonCell from "./renderSkeletonCell";
import { useTranslation } from "react-i18next";

// ------------------------------------------------------------------------

const skeletonRows = Array.from({ length: 2 }, (_, index) => ({
    id: index + 1,
}));

// ------------------------------------------------------------------------

const DataGridTable: FC<GridProps> = ({
    rows: _rows,
    columns: _columns,
    loading,
    page,
    pageSize,
    totalRows,
    resource = "property",
    ...props
}) => {
    const { t } = useTranslation();

    const columns = useMemo(
        () =>
            loading
                ? _columns.map((c) => ({
                      ...c,
                      renderCell: renderSkeletonCell,
                  }))
                : _columns,
        [_columns, loading]
    );

    const rows = loading ? skeletonRows : _rows || [];

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
            rows={rows}
            columns={columns}
            pageSizeOptions={[25, 50, 100]}
            // ...
            {...props}
        />
    );
};

export default DataGridTable;
