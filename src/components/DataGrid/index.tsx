import {
  GridColDef,
  GridRowsProp,
  GridSortDirection,
  GridSortModel,
  GridToolbar,
} from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import { FC, useMemo, useState } from "react";
import { addTab } from "src/slices/tabs";
import { useDispatch } from "src/store";
import { StyledDataGrid } from "./styles";

type GridProps = {
  rows: GridRowsProp;
  columns: GridColDef[];
  sortingBy: string | null;
  sortingOrder: string | null;
};

const DataGridTable: FC<GridProps> = ({
  rows,
  columns,
  sortingBy,
  sortingOrder,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [sortModel, setSortModel] = useState<GridSortModel>([]);

  const handleSortChange = (newSortModel: any) => {
    setSortModel(newSortModel);
  };

  useMemo(() => {
    setSortModel([
      { field: sortingBy || "", sort: sortingOrder as GridSortDirection },
    ]);
  }, [sortingBy, sortingOrder]);

  return (
    <>
      <StyledDataGrid
        slots={{
          toolbar: GridToolbar,
        }}
        localeText={{
          toolbarColumns: "Πεδία",
          columnsPanelTextFieldLabel: "Αναζήτηση πεδίου",
          columnsPanelTextFieldPlaceholder: "'Ονομα πεδίου",
        }}
        initialState={{
          pagination: { paginationModel: { pageSize: 25 } },
        }}
        disableColumnFilter
        disableDensitySelector
        rowHeight={100}
        getRowId={(e) => e.id}
        onRowClick={(e) => {
          router.push(`/property/${e.row.id}`);
          dispatch(
            addTab({
              title: `Property ${e.row.id}`,
              path: `/property/${e.row.id}`,
            })
          );
        }}
        checkboxSelection
        autoHeight
        disableRowSelectionOnClick
        sortModel={sortModel}
        onSortModelChange={handleSortChange}
        rows={rows}
        columns={columns}
      />
    </>
  );
};

export default DataGridTable;
