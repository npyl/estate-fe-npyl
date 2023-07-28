import { Autocomplete, FormControl, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { setManagerId } from "src/slices/filters";

import { useAllUsersQuery } from "src/services/user";

import { useState } from "react";

export default function ManagerIdSelect() {
  const dispatch = useDispatch();

  const [autocompleteValue, setAutocompleteValue] = useState("");

  const managerIds: string[] =
    useAllUsersQuery(undefined, {
      selectFromResult: ({ data }) => ({
        data: data
          ?.filter((manager) => manager.id !== null)
          .map((manager) => {
            return manager.id.toString();
          }),
      }),
    }).data || [];

  const autocompleteChange = (_event: any, value: string | null) => {
    setAutocompleteValue(value || "");

    dispatch(
      setManagerId(
        // On autofill we get a stringified value.
        value
          ? typeof value === "string"
            ? parseInt(value)
            : value
          : undefined
      )
    );
  };

  return (
    <FormControl sx={{ width: 135 }}>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        value={autocompleteValue}
        onChange={autocompleteChange}
        options={managerIds}
        renderInput={(params) => (
          <TextField {...params} placeholder="Manager ID" />
        )}
      />
    </FormControl>
  );
}
