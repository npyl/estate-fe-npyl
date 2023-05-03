import { GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { addTab } from "src/slices/tabs";
import { useDispatch } from "src/store";
import { StyledDataGrid } from "./styles";

type GridProps = {
  rows: GridRowsProp;
  columns: GridColDef[];
};

const DataGridTable: FC<GridProps> = ({ rows, columns }) => {
  const router = useRouter();
  const dispatch = useDispatch();
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
      rows={rows}
      columns={columns}
    />
  );
};

export default DataGridTable;
