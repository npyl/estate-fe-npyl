import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import citiesJson from "src/json/countries.json";
import { Feature } from "src/types/cities";

export default function CountrySelect() {
  const cities: readonly Feature[] = citiesJson.features;
  return (
    <Autocomplete
      id='country-select-demo'
      sx={{ width: 185 }}
      options={cities}
      autoHighlight
      clearIcon={false}
      getOptionLabel={(option) =>
        option.properties.NAME || option.properties.ONOMA
      }
      renderOption={(props, option) => (
        <Box
          component='li'
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          {option.properties.ONOMA}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder='Επιλέξτε περιοχή'
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
