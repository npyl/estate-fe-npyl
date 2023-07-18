import GridViewIcon from "@mui/icons-material/GridView";
import MapIcon from "@mui/icons-material/Map";
import {
  ButtonGroup,
  Grid,
  IconButton,
  Paper,
  Skeleton,
  Stack,
  SvgIconTypeMap,
  Typography,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { Box, padding, width } from "@mui/system";
import {
  GridCallbackDetails,
  GridCellParams,
  GridColDef,
  GridPaginationModel,
} from "@mui/x-data-grid";
import { FC, ReactNode, SetStateAction, useEffect, useState } from "react";

import Image from "src/components/image";
import Label from "src/components/label/Label";
import { Menu } from "src/icons/menu";
import { useFilterPropertiesMutation } from "src/services/properties";
import DataGridTable from "../../components/DataGrid";
import MapView from "./MapView";
import MediaCard from "./MediaCard";
import { FilterSection } from "./Filters";
import FilterRows from "./Filters/FilterRows";
import FilterSortBy from "./Filters/FilterSortBy";

import { selectAll } from "src/slices/filters";
import { useSelector } from "react-redux";
import { IProperties } from "src/types/properties";

type optionType = "list" | "grid" | "map";

type viewOptionsType = {
  id: optionType;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  label: string;
};

const ViewAll: FC = () => {
  const [rows, setRows] = useState<IProperties[]>([]);
  // sorting
  const [sortingBy, setSortingBy] = useState("");
  const [sortingOrder, setSortingOrder] = useState("asc");
  // pagination
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(25);
  // view
  const [optionView, setOptionView] = useState<optionType>("list");

  const allFilters = useSelector(selectAll);

  const [filterProperties, { isLoading, data }] = useFilterPropertiesMutation();

  useEffect(() => {
    filterProperties({ filter: allFilters, page: page, pageSize: pageSize });
  }, [allFilters, page, pageSize]);

  useEffect(() => {
    if (!data) return;
    setRows(data.content);
  }, [data]);

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
        <Image src={`${params.formattedValue}` || ""} alt="" ratio="16/9" />
      </>
    );
  }

  type PropertyStatus =
    | "SOLD"
    | "SALE"
    | "RENTED"
    | "UNAVAILABLE"
    | "RENT"
    | "TAKEN"
    | "UNDER_CONSTRUCTION"
    | "UNDER_MAINTENANCE";

  type Color = string;

  type StatusColors = Record<PropertyStatus, Color>;

  const STATUS_COLORS: StatusColors = {
    SOLD: "#79798a",
    SALE: "#57825e",
    RENT: "#bd9e39",
    RENTED: "#3e78c2",
    UNAVAILABLE: "#c72c2e",
    TAKEN: "#7d673e",
    UNDER_CONSTRUCTION: "#A300D8",
    UNDER_MAINTENANCE: "#E0067C",
  };
  function statusColor(params: GridCellParams) {
    if (!params.value) {
      return <></>;
    }
    const status = (params.value as string).trim();
    const statusUpper = status.toUpperCase() as PropertyStatus;
    console.log("statusUpper:", statusUpper); // add this to debug the value
    const color = STATUS_COLORS[statusUpper] || "#537f91"; // default color if status is not recognized

    return (
      <Box
        sx={{
          width: 150,
          height: 30,
          bgcolor: color,
          color: "white",
          borderRadius: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {status}
      </Box>
    );
  }
  const columns: GridColDef[] = [
    {
      field: "propertyImage",
      headerName: "Thumbnail",
      width: 180,
      align: "center",
      headerAlign: "center",
      renderCell: renderImage,
    },
    {
      field: "code",
      headerName: "Reference ID",
      width: 180,
      headerAlign: "center",

      align: "center",
    },
    {
      field: "parentCategory",
      width: 180,
      align: "center",
      headerAlign: "center",
      headerName: "Category",
    },
    {
      field: "category",
      width: 180,
      align: "center",
      headerAlign: "center",
      headerName: "Subcategory",
    },
    {
      field: "price",
      width: 180,
      headerAlign: "center",
      align: "center",
      headerName: "Price",
    },
    {
      field: "state",
      headerAlign: "center",
      width: 180,
      align: "center",
      headerName: "Status",
      renderCell: statusColor,
    },
    {
      field: "area",
      width: 180,
      headerAlign: "center",
      align: "center",
      headerName: "Area",
    },
  ];

  const renderSkeletonCell = () => <Skeleton width={150} animation="wave" />;
  const skeletonRows = Array.from({ length: 2 }, (_, index) => ({
    id: index + 1,
  }));
  const handlePaginationModelChange = (
    model: GridPaginationModel,
    details: GridCallbackDetails
  ) => {
    setPage(model.page);
    setPageSize(model.pageSize);
  };

  return (
    <Box>
      <FilterSection />
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        paddingTop={2}
        paddingX={2}
      >
        <Box display={"flex"} alignItems={"center"} gap={1}>
          <Typography variant={"body2"} fontWeight={600}>
            {rows?.length} Αποτελέσματα
          </Typography>
        </Box>
        <Stack direction={"row"} alignItems={"center"} spacing={1}>
          <FilterSortBy
            onSorting={(
              sortingBy: SetStateAction<string>,
              sortingOrder: SetStateAction<string>
            ) => {
              setSortingBy(sortingBy);
              setSortingOrder(sortingOrder);
            }}
          />
          <FilterRows />
          <ButtonGroup size="small" aria-label="small button group">
            {viewOptions.map((option) => (
              <IconButton
                sx={{
                  ml: 1,
                  height: 30,
                  width: 30,
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
          </ButtonGroup>
        </Stack>
      </Stack>
      {rows && !isLoading ? (
        <>
          {optionView === "list" && (
            <Paper sx={{ mt: 2 }}>
              <DataGridTable
                rows={rows}
                columns={columns}
                sortingBy={sortingBy}
                sortingOrder={sortingOrder}
                page={page}
                pageSize={pageSize}
                onPaginationModelChange={handlePaginationModelChange}
              />
            </Paper>
          )}
          {optionView === "grid" && (
            <Paper sx={{ marginTop: 2 }}>
              <MediaCard data={rows} />
            </Paper>
          )}
          {optionView === "map" && (
            <Paper sx={{ marginTop: 2 }}>
              <MapView data={rows} />
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
            page={page}
            pageSize={pageSize}
            onPaginationModelChange={handlePaginationModelChange}
          />
        </Paper>
      )}
    </Box>
  );
};

export default ViewAll;
