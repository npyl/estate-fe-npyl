import {
  FormControlLabel,
  Radio,
  Autocomplete,
  TextField,
} from "@mui/material";
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
      id="select-demo-sale"
      sx={{ width: 135 }}
      options={stateFilterOptions}
      autoHighlight
      clearIcon={false}
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => (
        <FormControlLabel
          control={<Radio checked={state === option.value} size="small" />}
          label={option.label}
          sx={{ p: 1, width: "100%" }}
          onClick={() => dispatch(setState(option?.value))}
        />
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
