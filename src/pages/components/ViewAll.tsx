import GridViewIcon from "@mui/icons-material/GridView";
import MapIcon from "@mui/icons-material/Map";
import TuneIcon from "@mui/icons-material/Tune";
import { Badge, Paper, Stack, SvgIconTypeMap, Tab, Tabs } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { Box } from "@mui/system";
import { GridCellParams, GridColDef } from "@mui/x-data-grid";
import { FC, ReactNode, useMemo, useState } from "react";

import Image from "src/components/image";
import Label from "src/components/label/Label";
import { Menu } from "src/icons/menu";
import { useFilterPropertiesMutation } from "src/services/properties";
import DataGridTable from "../../components/DataGrid";
import MapView from "./MapView";
import MediaCard from "./MediaCard";

import sumOfChangedProperties, {
  getChangedFields,
  resetState,
  selectSortingBy,
  selectSortingOrder,
} from "src/slices/filters";

import { useAllPropertyGlobalQuery } from "src/services/global";
import { useDispatch, useSelector } from "src/store";
import { IGlobal, IGlobalProperty } from "src/types/global";
import { IPropertyFilter } from "src/types/properties";
import {
  CategorySelect,
  CountrySelect,
  FilterMore,
  FilterSortBy,
  PriceSelect,
  SaleSelect,
  StyledPriceButton,
  SubCategorySelect,
  TagFiltered,
} from "./Filters";

const ViewAll: FC = () => {
  const dispatch = useDispatch();
  const changedPropsCount = useSelector(sumOfChangedProperties);
  const changedProps = useSelector(getChangedFields);
  const sortingBy = useSelector(selectSortingBy);
  const sortingOrder = useSelector(selectSortingOrder);
  const [openFilter, setOpenFilter] = useState(false);
  const [option, setOption] = useState<optionType>("list");

  const [filter, setFilter] = useState<IPropertyFilter>({} as IPropertyFilter);
  const [filterProperties, { isLoading, data }] = useFilterPropertiesMutation();

  // get enums
  const enums: IGlobal | undefined = useAllPropertyGlobalQuery().data;
  const propertyEnums: IGlobalProperty | undefined = enums?.property;

  useMemo(() => {
    filterProperties(filter);
  }, [filter, filterProperties]);

  if (!data || !filterProperties || !enums || !propertyEnums) return null;

  type optionType = "list" | "grid" | "map";
  enum ITabEnum {
    "list",
    "grid",
    "map",
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
    { field: "area", headerName: "Area" },
  ];

  const handleResetFilter = () => {
    dispatch(resetState());
  };

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleApplyFilter = () => {
    console.log(changedProps);
    setFilter(changedProps);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
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

            <CategorySelect propertyEnums={propertyEnums} />
            <SubCategorySelect propertyEnums={propertyEnums} />

            <PriceSelect type={"price"} />

            <FilterSortBy />

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
            <Tabs value={ITabEnum[option]} aria-label='icon label tabs example'>
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
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Stack>
            <TagFiltered />
          </Stack>
        </Box>
      </Paper>

      {option === "list" && (
        <Paper sx={{ mt: 2 }}>
          <DataGridTable
            rows={data}
            columns={columns}
            sortingBy={sortingBy}
            sortingOrder={sortingOrder}
          />
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

      {openFilter && (
        <FilterMore
          open={openFilter}
          onOpen={handleOpenFilter}
          onApply={handleApplyFilter}
          onClose={handleCloseFilter}
          onResetFilter={handleResetFilter}
        />
      )}
    </Box>
  );
};

export default ViewAll;
