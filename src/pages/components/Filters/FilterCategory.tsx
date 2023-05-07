import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { setCategory } from "src/slices/filters";
import { useDispatch } from "src/store";

export default function CategorySelect() {
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
  const dispatch = useDispatch();
  return (
    <Autocomplete
      sx={{ width: 180 }}
      id='select-demo'
      options={categoryFilterOptions}
      autoHighlight
      clearIcon={false}
      onChange={(_e, newValue) => dispatch(setCategory(newValue || ""))}
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => (
        <Box
          component='li'
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          {option.label}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder='Τύπος Κατοικίας'
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}
