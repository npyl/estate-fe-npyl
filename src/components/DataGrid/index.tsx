import { GridCellParams, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import Image from "next/legacy/image";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { IProperties } from "src/types/properties";
import { StyledDataGrid } from "./styles";

function renderImage(params: GridCellParams) {
  return (
    <>
      <Image
        src={`data:image/jpeg;base64,${params.formattedValue}` || ""}
        alt=''
        height={70}
        width={70}
      />
    </>
  );
}

const columns: GridColDef[] = [
  { field: "thumbnail", headerName: "Thumbnail", renderCell: renderImage },
  { field: "referenceId", headerName: "Reference ID" },
  { field: "type", headerName: "Type" },
  { field: "dateCreated", headerName: "Date Created" },
  { field: "website", headerName: "Website" },
];

type GridProps = {
  data: IProperties[];
};

const DataGridTable: FC<GridProps> = ({ data }) => {
  const router = useRouter();

  const rows: GridRowsProp = data.map((row, index) => {
    return {
      id: index,
      thumbnail: row.propertyImage,
      referenceId: "World",
      type: "hi",
      dateCreated: "hi",
      website: "hi",
    };
  });

  return (
    <StyledDataGrid
      onRowClick={(e) => router.push(`/property/${e.row.referenceId}`)}
      checkboxSelection
      autoHeight
      disableRowSelectionOnClick
      rows={rows}
      columns={columns}
    />
  );
};

export default DataGridTable;
