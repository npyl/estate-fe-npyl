import citiesJson from "src/json/countries.json";
import { selectCity } from "src/slices/filters";
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
    <></>
    // <Autocomplete
    //   id='country-select-demo'
    //   sx={{ width: 200 }}
    //   options={cities}
    //   autoHighlight
    //   value={selectedCities}
    //   isOptionEqualToValue={(option, value) =>
    //     option.properties.NAME === value.properties.NAME
    //   }
    //   clearIcon={false}
    //   onChange={(_e, newValue) => dispatch(setCity(newValue))}
    //   getOptionLabel={(option) =>
    //     option.properties.NAME || option.properties.ONOMA
    //   }
    //   renderOption={(props, option) => (
    //     <li {...props}>
    //       <Checkbox checked={selectedCities.includes(option.properties.NAME)} />
    //       {option.properties.ONOMA}
    //     </li>
    //   )}
    //   renderInput={(params) => (
    //     <TextField
    //       {...params}
    //       placeholder='Επιλέξτε περιοχή'
    //       InputLabelProps={{
    //         shrink: true,
    //       }}
    //       inputProps={{
    //         ...params.inputProps,
    //         autoComplete: "new-password", // disable autocomplete and autofill
    //       }}
    //     />
    //   )}
    // />
  );
}
