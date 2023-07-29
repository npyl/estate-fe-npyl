import { Autocomplete, FormControl, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { setCode } from "src/slices/filters";

import { useAllPropertiesQuery } from "src/services/properties";

import { useState } from "react";

export default function CodeSelect() {
    const dispatch = useDispatch();

    const [autocompleteValue, setAutocompleteValue] = useState("");

    const propertyCodes: string[] =
        useAllPropertiesQuery(undefined, {
            selectFromResult: ({ data }) => ({
                data: data
                    ?.filter((property) => property.code !== null)
                    .map((property) => {
                        return property.code;
                    }),
            }),
        }).data || [];

    const autocompleteChange = (_event: any, value: string | null) => {
        setAutocompleteValue(value || "");

        dispatch(
            setCode(
                // On autofill we get a stringified value.
                value ? value : undefined
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
                options={propertyCodes}
                renderInput={(params) => (
                    <TextField {...params} placeholder="Code" />
                )}
            />
        </FormControl>
    );
}
