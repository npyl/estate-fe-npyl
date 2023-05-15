import { Autocomplete, Box, Checkbox, TextField } from "@mui/material";
import { useAllPropertyGlobalQuery } from "src/services/global";
import {
  selectStates,
  setStates,
  deleteState,
  deleteFilter,
} from "src/slices/filters";
import { useDispatch, useSelector } from "src/store";

import { IFilterOptions } from "./types";

export default function SaleSelect() {
  const dispatch = useDispatch();
  const states = useSelector(selectStates);

  const { data } = useAllPropertyGlobalQuery();
  const stateEnum = data?.property?.state;

  if (!stateEnum) return null;

  const stateFilterOptions: IFilterOptions = {
    "": { label: "All States", checked: false },
    ...Object.fromEntries(
      stateEnum.map((item) => [item, { label: item, checked: false }])
    ),
  };

  return (
    <Autocomplete
      sx={{ width: 135 }}
      options={Object.keys(stateFilterOptions)}
      autoHighlight
      clearIcon={false}
      getOptionLabel={(option) => stateFilterOptions[option].label}
      componentsProps={{ popper: { style: { width: "200px" } } }}
      onChange={(_e, option) => {
        if (option === null) return;

        const checked = states.includes(option);
        const newState = !checked; // toggle

        if (option === "") {
          dispatch(deleteFilter("states"));
          stateFilterOptions[""].checked = true;
        } else
          newState
            ? dispatch(setStates([...states, option])) // add
            : dispatch(deleteState(option)); // delete
      }}
      renderOption={(props, option) => (
        <Box {...props} component="li">
          <Checkbox checked={states.includes(option)} />
          {stateFilterOptions[option].label}
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
