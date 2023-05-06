import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function SaleSelect() {
  const stateFilterOptions = [
    { value: "ALL", label: "'Ολα" },
    { value: "SALE", label: "Πώληση" },
    { value: "RENT", label: "Ενοίκιο" },
  ];
  return (
    <Autocomplete
      id='select-demo-sale'
      sx={{ width: 120 }}
      options={stateFilterOptions}
      autoHighlight
      clearIcon={false}
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
          InputLabelProps={{
            shrink: true,
          }}
          placeholder='Πώληση'
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}
