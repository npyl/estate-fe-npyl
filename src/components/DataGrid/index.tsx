import { GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import { FC } from "react";
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

  if (!sortingBy) sortingBy = "";
  if (!sortingOrder) sortingOrder = null;

  return (
    <StyledDataGrid
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
      initialState={{
        sorting: {
          sortModel: [{ field: sortingBy, sort: null }],
        },
      }}
      rows={rows}
      columns={columns}
    />
  );
};

export default DataGridTable;
