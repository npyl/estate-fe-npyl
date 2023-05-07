// import FilterAltIcon from "@mui/icons-material/FilterAlt";
import GridViewIcon from "@mui/icons-material/GridView";
import MapIcon from "@mui/icons-material/Map";
import TuneIcon from "@mui/icons-material/Tune";
import { Badge, Paper, Stack, SvgIconTypeMap, Tab, Tabs } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { Box } from "@mui/system";
import { GridCellParams, GridColDef } from "@mui/x-data-grid";
import { FC, ReactNode, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import FormProvider from "src/components/hook-form/FormProvider";
import Image from "src/components/image";
import Label from "src/components/label/Label";
import { Menu } from "src/icons/menu";
import { useFilterPropertiesMutation } from "src/services/properties";
import DataGridTable from "../../components/DataGrid";
import MapView from "./MapView";
import MediaCard from "./MediaCard";

import sumOfChangedProperties from "src/slices/filters";
import { useSelector } from "src/store";
import { IPropertyFilter } from "src/types/properties";
import CategorySelect from "./Filters/FilterCategory";
import CountrySelect from "./Filters/FilterCities";
import FilterMore from "./Filters/FilterMore";
import PriceSelect from "./Filters/FilterPrice";
import SaleSelect from "./Filters/FilterSale";
import { StyledPriceButton } from "./Filters/styles";

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
  const changedPropsCount = useSelector(sumOfChangedProperties);
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
    <FormProvider methods={methods}>
      <Box>
        <Paper sx={{ paddingX: 2, paddingY: 1, overflow: "scroll" }}>
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
              spacing={0.5}
            >
              <CountrySelect />
              <SaleSelect />

              <CategorySelect />

              <PriceSelect type={"price"} />
              <PriceSelect type={"area"} />

              <StyledPriceButton
                open={false}
                disableRipple
                color='inherit'
                sx={{ width: 120 }}
                endIcon={
                  <Badge badgeContent={changedPropsCount} color='error'>
                    <TuneIcon />
                  </Badge>
                }
                onClick={handleOpenFilter}
              >
                Φίλτρα
              </StyledPriceButton>
            </Stack>
            <Stack direction={"row"} spacing={1}>
              {/* <FilterDrawer
                  isDefault={isDefault}
                  open={openFilter}
                  onOpen={handleOpenFilter}
                  onClose={handleCloseFilter}
                  onResetFilter={handleResetFilter}
                /> */}
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
      {openFilter && (
        <FilterMore
          isDefault={isDefault}
          open={openFilter}
          onOpen={handleOpenFilter}
          onClose={handleCloseFilter}
          onResetFilter={handleResetFilter}
        />
      )}
    </FormProvider>
  );
};

export default ViewAll;
