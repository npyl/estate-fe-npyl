import {
  Autocomplete,
  FormControlLabel,
  Radio,
  TextField,
} from "@mui/material";
import { selectCategory, setCategory } from "src/slices/filters";
import { useDispatch, useSelector } from "react-redux";

import { useAllPropertyGlobalQuery } from "src/services/global";

export default function CategorySelect() {
  const dispatch = useDispatch();
  const category = useSelector(selectCategory);

  const { data } = useAllPropertyGlobalQuery();
  const propertyEnums = data?.property;
  const categoryEnums = propertyEnums?.parentCategory;

  if (!data || !propertyEnums || !categoryEnums) return null;

  const categoryFilterOptions = [
    { value: "", label: "All Categories" },
    ...categoryEnums.map((item) => ({ value: item, label: item })),
  ];

  return (
    <Autocomplete
      sx={{ width: 180 }}
      id="select-demo"
      options={categoryFilterOptions}
      autoHighlight
      clearIcon={false}
      onChange={(_e, newValue) => dispatch(setCategory(newValue?.value))}
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => (
        <FormControlLabel
          control={<Radio checked={category === option.value} size="small" />}
          label={option.label}
          sx={{ p: 1, width: "100%" }}
          onClick={() => dispatch(setCategory(option?.value))}
        />
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Κατηγορία"
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
