import GridViewIcon from "@mui/icons-material/GridView";
import MapIcon from "@mui/icons-material/Map";
import TuneIcon from "@mui/icons-material/Tune";
import {
  Badge,
  IconButton,
  Paper,
  Skeleton,
  Stack,
  SvgIconTypeMap,
  Typography,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { Box } from "@mui/system";
import { GridCellParams, GridColDef } from "@mui/x-data-grid";
import { FC, ReactNode, useEffect, useState } from "react";

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
} from "src/slices/filters";

import { useDispatch, useSelector } from "src/store";
import { IPropertyFilter } from "src/types/properties";
import {
  CategorySelect,
  FilterMore,
  FilterSortBy,
  PriceSelect,
  SaleSelect,
  StyledPriceButton,
  SubCategorySelect,
  TagFiltered,
} from "./Filters";
import CountrySelect from "./Filters/FilterCities";
import FilterLabels from "./Filters/FilterLabels";
import FilterRows from "./Filters/FilterRows";

const ViewAll: FC = () => {
  const dispatch = useDispatch();
  const changedPropsCount = useSelector(sumOfChangedProperties);
  const changedProps = useSelector(getChangedFields);
  const [sortingBy, setSortingBy] = useState("");
  const [sortingOrder, setSortingOrder] = useState("asc");
  const [openFilter, setOpenFilter] = useState(false);
  const [optionView, setOptionView] = useState<optionType>("list");

  const [filter, setFilter] = useState<IPropertyFilter>({} as IPropertyFilter);
  const [filterProperties, { isLoading, data }] = useFilterPropertiesMutation();

  type optionType = "list" | "grid" | "map";

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
          alt=""
          ratio="16/9"
          width={1}
        />
      </>
    );
  }
  function renderLabel(params: GridCellParams) {
    return (
      <>
        <Label
          variant="filled"
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
    setFilter(changedProps);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const renderSkeletonCell = () => <Skeleton width={150} animation="wave" />;
  const skeletonRows = Array.from({ length: 5 }, (_, index) => ({
    id: index + 1,
  }));
  useEffect(() => {
    filterProperties(filter);
  }, [filter]);
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

            <CategorySelect />
            <SubCategorySelect />

            <PriceSelect type={"price"} />
            <FilterLabels />
            <StyledPriceButton
              open={false}
              disableRipple
              color="inherit"
              sx={{ width: 120 }}
              endIcon={
                <Badge badgeContent={changedPropsCount} color="error">
                  <TuneIcon />
                </Badge>
              }
              onClick={handleOpenFilter}
            >
              Φίλτρα
            </StyledPriceButton>
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
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        paddingTop={2}
        paddingX={2}
      >
        <Typography variant={"body2"} fontWeight={600}>
          {data?.length} Αποτελέσματα
        </Typography>
        <Stack direction={"row"} spacing={0.5}>
          {viewOptions.map((option) => (
            <IconButton
              sx={{
                color:
                  optionView === option.id ? "primary.main" : "neutral.300",
                border:
                  optionView === option.id
                    ? "1px solid blue"
                    : "1px solid lightgrey",
              }}
              key={option.id}
              onClick={() => setOptionView(option.id)}
            >
              <option.icon />
            </IconButton>
          ))}
        </Stack>
        <Stack direction={"row"} alignItems={"center"}>
          <FilterSortBy
            onSorting={(sortingBy, sortingOrder) => {
              setSortingBy(sortingBy);
              setSortingOrder(sortingOrder);
            }}
          />
          <FilterRows />
        </Stack>
      </Stack>
      {!isLoading && data ? (
        <>
          {optionView === "list" && (
            <Paper sx={{ mt: 2 }}>
              <DataGridTable
                rows={data}
                columns={columns}
                sortingBy={sortingBy}
                sortingOrder={sortingOrder}
              />
            </Paper>
          )}
          {optionView === "grid" && (
            <Paper sx={{ marginTop: 2 }}>
              <MediaCard data={data} />
            </Paper>
          )}
          {optionView === "map" && (
            <Paper sx={{ marginTop: 2 }}>
              <MapView />
            </Paper>
          )}
        </>
      ) : (
        <Paper sx={{ mt: 2 }}>
          <DataGridTable
            rows={skeletonRows}
            columns={columns.map((column) => ({
              ...column,
              renderCell: renderSkeletonCell,
            }))}
            sortingBy={sortingBy}
            sortingOrder={sortingOrder}
          />
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
