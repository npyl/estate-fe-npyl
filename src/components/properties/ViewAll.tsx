import GridViewIcon from "@mui/icons-material/GridView";
import MapIcon from "@mui/icons-material/Map";
import {
  Button,
  Card,
  CardContent,
  Container,
  Paper,
  Stack,
  SvgIconTypeMap,
  Typography,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { Box } from "@mui/system";
import { FC, useState } from "react";
import { Menu } from "src/icons/menu";
import { useAllPropertiesQuery } from "src/services/properties";
import DataGridTable from "../DataGrid";
import MediaCard from "./MediaCard";

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

  return (
    <Container maxWidth='xl'>
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
              <Typography variant='h6'>Properties</Typography>
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
          <Paper
            sx={{
              padding: 1,
              overflow: "auto",
              maxHeight: "720px",
            }}
          >
            {option === "list" && <DataGridTable data={data} />}
            {option === "grid" && <MediaCard data={data} />}
            {option === "map" && <DataGridTable data={data} />}
          </Paper>
        </Card>
      </Box>
    </Container>
  );
};

export default ViewAll;
