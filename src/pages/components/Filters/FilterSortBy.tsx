import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { setSortingBy, setSortingOrder } from "src/slices/filters";
import { useDispatch } from "src/store";

export default function FilterSortBy() {
  const sortByFilterOptions = [
    { value: "ALL", label: "Προεπιλογή" },
    {
      value: "Ascending_Price",
      label: "Αύξουσα Τιμή",
    },
    {
      value: "Descending_Price",
      label: "Φθίνουσα Τιμή",
    },
    {
      value: "Ascending_Area",
      label: "Αύξον Μέγεθος",
    },
    {
      value: "Descending_Area",
      label: "Φθίνον Μέγεθος",
    },
  ];

  const dispatch = useDispatch();

  return (
    <Autocomplete
      sx={{ width: 180 }}
      id="select-demo"
      options={sortByFilterOptions}
      autoHighlight
      clearIcon={false}
      onChange={(_e, newValue) => {
        if (newValue?.value === sortByFilterOptions[0].value) {
          // ignore
        } else if (newValue?.value === sortByFilterOptions[1].value) {
          dispatch(setSortingBy("price"));
          dispatch(setSortingOrder("asc"));
        } else if (newValue?.value === sortByFilterOptions[2].value) {
          dispatch(setSortingBy("price"));
          dispatch(setSortingOrder("desc"));
        } else if (newValue?.value === sortByFilterOptions[3].value) {
          dispatch(setSortingBy("area"));
          dispatch(setSortingOrder("asc"));
        } else if (newValue?.value === sortByFilterOptions[4].value) {
          dispatch(setSortingBy("area"));
          dispatch(setSortingOrder("desc"));
        }
      }}
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          {option.label}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Sort By"
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
