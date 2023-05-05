import GridViewIcon from "@mui/icons-material/GridView";
import MapIcon from "@mui/icons-material/Map";
import {
  Button,
  Container,
  FormControl,
  MenuItem,
  Paper,
  Select,
  Stack,
  SvgIconTypeMap,
  Tab,
  Tabs,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { Box } from "@mui/system";
import { FC, ReactNode, useMemo, useState } from "react";
import { Menu } from "src/icons/menu";
import { useFilterPropertiesMutation } from "src/services/properties";
import DataGridTable from "../../components/DataGrid";
import MediaCard from "./MediaCard";

import { GridCellParams, GridColDef } from "@mui/x-data-grid";
import { useForm } from "react-hook-form";
import FormProvider from "src/components/hook-form/FormProvider";
import Iconify from "src/components/iconify";
import Image from "src/components/image";
import Label from "src/components/label/Label";
import FilterDrawer from "./FilterDrawer";
import MapView from "./MapView";
import ShopTagFiltered from "./TagFiltered";

import { IPropertyFilter } from "src/types/properties";

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

  // Filters
  const stateFilterOptions = [
    { value: "ALL", label: "All Properties" },
    { value: "SALE", label: "Sale" },
    { value: "RENT", label: "Rent" },
  ];

  const categoryFilterOptions = [
    { value: "ALL", label: "All Categories" },
    { value: "APARTMENT", label: "Apartment" },
    { value: "STUDIO", label: "Studio" },
    { value: "MAISONETTE", label: "Maisonette" },
    { value: "DETACHED_HOUSE", label: "Detached House" },
    { value: "VILLA", label: "Villa" },
    { value: "LOFT", label: "Loft" },
    { value: "BUNGALOW", label: "Bungalow" },
    { value: "BUILDING", label: "Building" },
    { value: "APARTMENT_COMPLEX", label: "Apartment complex" },
    { value: "FARM", label: "Farm" },
    { value: "HOUSEBOAT", label: "Houseboat" },
    { value: "OTHER_CATEGORIES", label: "Other categories" },
    { value: "OFFICE", label: "Office" },
    { value: "STORE", label: "Store" },
    { value: "WAREHOUSE", label: "Warehouse" },
    { value: "INDUSTRIAL_SPACE", label: "Industrial space" },
    { value: "CRAFT_SPACE", label: "Craft space" },
    { value: "HOTEL", label: "Hotel" },
    { value: "BUSINESS_BUILDING", label: "Business building" },
    { value: "HALL", label: "Hall" },
    { value: "SHOWROOM", label: "Showroom" },
    { value: "LAND_PLOT", label: "Land Plot" },
    { value: "PARCELS", label: "Parcels" },
    { value: "ISLAND", label: "Island" },
    { value: "PARKING", label: "Parking" },
    { value: "BUSINESS", label: "Business" },
    { value: "PREFABRICATED", label: "Prefabricated" },
    { value: "DETACHABLE", label: "Detachable" },
    { value: "AIR", label: "Air" },
    { value: "OTHER", label: "Other" },
  ];

  const subCategoryFilterOptions = [
    { value: "ALL", label: "All Subcategories" },
  ];

  const [stateFilter, setStateFilter] = useState(stateFilterOptions[0].value);
  const [categoryFilter, setCategoryFilter] = useState(
    categoryFilterOptions[0].value
  );
  const [subCategoryFilter, setSubCategoryFilter] = useState(
    subCategoryFilterOptions[0].value
  );

  enum ITabEnum {
    "list",
    "grid",
    "map",
  }

  const standardFilter = () => {
    return {
      state:
        stateFilter === stateFilterOptions[0].value ? undefined : stateFilter,
      category:
        categoryFilter === categoryFilterOptions[0].value
          ? undefined
          : categoryFilter,
    };
  };

  const [filter, setFilter] = useState<IPropertyFilter>(standardFilter);
  const [filterProperties, { isLoading, data }] = useFilterPropertiesMutation();

  useMemo(() => {
    setFilter(standardFilter);
  }, [stateFilter, categoryFilter, subCategoryFilter]);

  useMemo(() => {
    filterProperties(filter);
  }, [filter, filterProperties]);

  if (!data) return null;
  if (!filterProperties) return null;

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
          {params.formattedValue as ReactNode}
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
    <Container maxWidth={false}>
      <FormProvider methods={methods}>
        <Box>
          <Paper sx={{ padding: "12px 24px", overflow: "scroll" }}>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Stack
                direction={"row"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                {!isDefault && (
                  <>
                    <ShopTagFiltered
                      isFiltered={!isDefault}
                      onResetFilter={handleResetFilter}
                    />
                  </>
                )}

                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <Select
                    value={stateFilter}
                    displayEmpty
                    IconComponent={() => null}
                  >
                    {stateFilterOptions.map((option) => (
                      <MenuItem
                        key={option.value}
                        value={option.value}
                        onClick={() => setStateFilter(option.value)}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <Select
                    value={categoryFilter}
                    displayEmpty
                    IconComponent={() => null}
                  >
                    {categoryFilterOptions.map((option) => (
                      <MenuItem
                        key={option.value}
                        value={option.value}
                        onClick={() => setCategoryFilter(option.value)}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <Select
                    value={subCategoryFilter}
                    displayEmpty
                    IconComponent={() => null}
                  >
                    {subCategoryFilterOptions.map((option) => (
                      <MenuItem
                        key={option.value}
                        value={option.value}
                        onClick={() => setSubCategoryFilter(option.value)}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Button
                  disableRipple
                  color='inherit'
                  endIcon={<Iconify icon='ic:round-filter-list' />}
                  onClick={handleOpenFilter}
                >
                  Filters
                </Button>
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
          </Paper>

          {option === "list" && (
            <Paper sx={{ mt: 2 }}>
              <DataGridTable rows={data} columns={columns} />
            </Paper>
          )}
          {option === "grid" && (
            <Paper sx={{ marginTop: 2 }}>
              <MediaCard data={data} />
            </Paper>
          )}
          {option === "map" && (
            <Paper sx={{ marginTop: 2 }}>
              <MapView />
            </Paper>
          )}
        </Box>
      </FormProvider>
    </Container>
  );
};

export default ViewAll;
