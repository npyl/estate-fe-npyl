import { Autocomplete, FormControl, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { setCode } from "src/slices/filters";
import { useSelector } from "react-redux";
import { useAllPropertiesQuery } from "src/services/properties";

import { useEffect, useState } from "react";
import { selectCode } from "src/slices/filters";
import { useTranslation } from "react-i18next";

export default function CodeSelect() {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const propertyCode = useSelector(selectCode);
    const [autocompleteValue, setAutocompleteValue] = useState("");

    useEffect(
        () => setAutocompleteValue(propertyCode?.toString() || ""),
        [propertyCode]
    );

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
                value={autocompleteValue}
                onChange={autocompleteChange}
                clearIcon={<></>}
                options={propertyCodes}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder={(t("Code") as string) || "Code"}
                    />
                )}
            />
        </FormControl>
    );
}
