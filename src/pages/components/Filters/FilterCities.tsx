import { Checkbox, Box } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import citiesJson from "src/json/countries.json";
import { selectCity, setCity } from "src/slices/filters";
import { useDispatch, useSelector } from "src/store";
import { Feature } from "src/types/cities";

export default function CountrySelect() {
  const dispatch = useDispatch();
  const selectedCity = useSelector(selectCity);

  const cities: readonly Feature[] = citiesJson.features;
  const cityNames = cities.map((city) => {
    return city.properties.NAME;
  });

  return (
    <Autocomplete
      id="country-select-demo"
      sx={{ width: 200 }}
      options={cityNames}
      autoHighlight
      value={selectedCity}
      isOptionEqualToValue={(option, value) => option === value}
      clearIcon={false}
      onChange={(_e, newValue) => dispatch(setCity(newValue))}
      getOptionLabel={(option) => option || option}
      renderOption={(props, option) => (
        <Box {...props} component="li">
          <Checkbox checked={selectedCity === option} />
          {option}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Επιλέξτε περιοχή"
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
