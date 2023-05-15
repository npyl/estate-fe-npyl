import { Autocomplete, Box, Checkbox, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectCategory, setCategory } from "src/slices/filters";

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
      id='select-demo'
      options={categoryFilterOptions}
      autoHighlight
      clearIcon={false}
      onChange={(_e, newValue) => dispatch(setCategory(newValue?.value))}
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => (
        <Box {...props} component='li'>
          <Checkbox checked={category === option.value} />
          {option.label}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder='Κατηγορία'
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
