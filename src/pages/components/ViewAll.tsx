import GridViewIcon from "@mui/icons-material/GridView";
import MapIcon from "@mui/icons-material/Map";
import {
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  SvgIconTypeMap,
  Typography,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { Box } from "@mui/system";
import { FC, useState } from "react";
import { Menu } from "src/icons/menu";
import { useAllPropertiesQuery } from "src/services/properties";
import DataGridTable from "../../components/DataGrid";
import MediaCard from "./MediaCard";

import { GridCellParams, GridColDef } from "@mui/x-data-grid";
import Image from "src/components/image";
import MapView from "./MapView";

const ViewAll: FC = () => {
  type optionType = "list" | "grid" | "map";
  const [option, setOption] = useState<optionType>("list");
  const { data } = useAllPropertiesQuery();
  if (!data) {
    return null;
  }

  type viewOptionsType = {
    id: optionType;
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
      muiName: string;
    };
    variant: "contained" | "outlined";
  };
  const viewOptions: viewOptionsType[] = [
    {
      id: "list",
      icon: Menu,
      variant: option === "list" ? "contained" : "outlined",
    },
    {
      id: "grid",
      icon: GridViewIcon,
      variant: option === "grid" ? "contained" : "outlined",
    },
    {
      id: "map",
      icon: MapIcon,
      variant: option === "map" ? "contained" : "outlined",
    },
  ];

  function renderImage(params: GridCellParams) {
    return (
      <>
        <Image
          src={`data:image/jpeg;base64,${params.formattedValue}` || ""}
          alt=""
          ratio="16/9"
          width={1}
        />
      </>
    );
  }

  const columns: GridColDef[] = [
    {
      field: "propertyImage",
      headerName: "Thumbnail",
      width: 180,
      renderCell: renderImage,
    },
    { field: "referenceId", headerName: "Reference ID" },
    { field: "type", headerName: "Type" },
    { field: "dateCreated", headerName: "Date Created" },
    { field: "website", headerName: "Website" },
  ];

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h6">Properties</Typography>
              <Stack direction={"row"} spacing={1}>
                {viewOptions.map((option) => (
                  <Button
                    color={"secondary"}
                    onClick={() => setOption(option.id)}
                    key={option.id}
                    variant={option.variant}
                  >
                    <option.icon />
                  </Button>
                ))}
              </Stack>
            </Box>
          </CardContent>
          <Box padding={2}>
            {option === "list" && (
              <DataGridTable rows={data} columns={columns} />
            )}
            {option === "grid" && <MediaCard data={data} />}
            {option === "map" && <MapView />}
          </Box>
        </Card>
      </Box>
    </Container>
  );
};

export default ViewAll;
