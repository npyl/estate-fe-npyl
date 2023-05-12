import { Autocomplete, Box, Checkbox, TextField } from "@mui/material";
import { useAllPropertyGlobalQuery } from "src/services/global";
import { selectState, setState } from "src/slices/filters";
import { useDispatch, useSelector } from "src/store";

export default function SaleSelect() {
  const dispatch = useDispatch();
  const state = useSelector(selectState);

  const { data } = useAllPropertyGlobalQuery();
  const stateEnum = data?.property?.state;

  if (!stateEnum) return null;

  const stateFilterOptions = [
    { value: "", label: "All" },
    ...stateEnum.map((item) => {
      return {
        value: item,
        label: item,
      };
    }),
  ];

  return (
    <Autocomplete
      sx={{ width: 135 }}
      options={stateFilterOptions}
      autoHighlight
      clearIcon={false}
      getOptionLabel={(option) => option.label}
      componentsProps={{ popper: { style: { width: "200px" } } }}
      onChange={(_e, newValue) => dispatch(setState(newValue?.value))}
      renderOption={(props, option) => (
        <Box {...props} component="li">
          <Checkbox checked={state === option.value} />
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
