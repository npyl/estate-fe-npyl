import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { setState } from "src/slices/filters";
import { useDispatch } from "src/store";

export default function SaleSelect() {
  const stateFilterOptions = [
    { value: "ALL", label: "'Ολα" },
    { value: "SALE", label: "Πώληση" },
    { value: "RENT", label: "Ενοικίαση" },
  ];
  const dispatch = useDispatch();

  return (
    <Autocomplete
      id="select-demo-sale"
      sx={{ width: 120 }}
      options={stateFilterOptions}
      autoHighlight
      clearIcon={false}
      onChange={(_e, newValue) => dispatch(setState(newValue?.value || ""))}
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
          placeholder="Πώληση"
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      )}
    />
  );
}
