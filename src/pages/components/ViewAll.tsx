import GridViewIcon from "@mui/icons-material/GridView";
import MapIcon from "@mui/icons-material/Map";
import {
  Card,
  CardContent,
  Container,
  Stack,
  SvgIconTypeMap,
  Tab,
  Tabs,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { Box } from "@mui/system";
import { FC, useState } from "react";
import { Menu } from "src/icons/menu";
import { useAllPropertiesQuery } from "src/services/properties";
import DataGridTable from "../../components/DataGrid";
import MediaCard from "./MediaCard";

import { GridCellParams, GridColDef } from "@mui/x-data-grid";
import { useForm } from "react-hook-form";
import FormProvider from "src/components/hook-form/FormProvider";
import Image from "src/components/image";
import Label from "src/components/label/Label";
import FilterDrawer from "./FilterDrawer";
import MapView from "./MapView";
import ShopTagFiltered from "./TagFiltered";

const defaultValues = {
  gender: [],
  category: "All",

  priceRange: [0, 200],
  rating: "",
  sortBy: "featured",
};

export interface IProductFilter {
  gender: string[];
  category: string;

  priceRange: number[];
  rating: string;
  sortBy: string;
}
const ViewAll: FC = () => {
  type optionType = "list" | "grid" | "map";
  const [openFilter, setOpenFilter] = useState(false);
  const methods = useForm<IProductFilter>({
    defaultValues,
  });

  const {
    reset,
    formState: { dirtyFields },
  } = methods;
  const [option, setOption] = useState<optionType>("list");

  enum ITabEnum {
    "list",
    "grid",
    "map",
  }

  const { data } = useAllPropertiesQuery();
  if (!data) {
    return null;
  }

  type viewOptionsType = {
    id: optionType;
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
      muiName: string;
    };
    label: string;
  };
  const viewOptions: viewOptionsType[] = [
    {
      id: "list",
      icon: Menu,
      label: "List",
    },
    {
      id: "grid",
      icon: GridViewIcon,
      label: "Grid",
    },
    {
      id: "map",
      icon: MapIcon,
      label: "Map",
    },
  ];

  function renderImage(params: GridCellParams) {
    return (
      <>
        <Image
          src={`data:image/jpeg;base64,${params.formattedValue}` || ""}
          alt=''
          ratio='16/9'
          width={1}
        />
      </>
    );
  }
  function renderLabel(params: GridCellParams) {
    console.log(params);
    return (
      <>
        <Label
          variant='filled'
          color={
            (params.formattedValue === "SOLD" && "error") ||
            (params.formattedValue === "SALE" && "info") ||
            "warning"
          }
        >
          {params.formattedValue}
        </Label>
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
    { field: "code", headerName: "Reference ID", align: "center" },
    { field: "type", headerName: "Type" },
    { field: "price", headerName: "Price" },
    {
      field: "state",
      headerName: "Status",
      renderCell: renderLabel,
    },
  ];

  const isDefault =
    (!dirtyFields.gender &&
      !dirtyFields.category &&
      !dirtyFields.priceRange &&
      !dirtyFields.rating) ||
    false;

  const handleResetFilter = () => {
    reset();
  };

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <Container maxWidth='xl'>
      <FormProvider methods={methods}>
        <Box sx={{ mb: 4 }}>
          <Card sx={{ mt: 4 }}>
            <CardContent sx={{ padding: "12px 24px" }}>
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Stack>
                  {!isDefault && (
                    <>
                      <ShopTagFiltered
                        isFiltered={!isDefault}
                        onResetFilter={handleResetFilter}
                      />
                    </>
                  )}
                </Stack>
                <Stack direction={"row"} spacing={1}>
                  <FilterDrawer
                    isDefault={isDefault}
                    open={openFilter}
                    onOpen={handleOpenFilter}
                    onClose={handleCloseFilter}
                    onResetFilter={handleResetFilter}
                  />
                  <Tabs
                    value={ITabEnum[option]}
                    aria-label='icon label tabs example'
                  >
                    {viewOptions.map((option) => (
                      <Tab
                        iconPosition='start'
                        onClick={() => setOption(option.id)}
                        id={option.id}
                        key={option.id}
                        icon={<option.icon />}
                        label={option.label}
                      />
                    ))}
                  </Tabs>
                </Stack>
              </Box>
            </CardContent>

            <Box>
              {option === "list" && (
                <DataGridTable rows={data} columns={columns} />
              )}
              {option === "grid" && <MediaCard data={data} />}
              {option === "map" && <MapView />}
            </Box>
          </Card>
        </Box>
      </FormProvider>
    </Container>
  );
};

export default ViewAll;
