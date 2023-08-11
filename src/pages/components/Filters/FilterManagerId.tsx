import { Autocomplete, FormControl, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectManagerId, setManagerId } from "src/slices/filters";

import { useAllUsersQuery } from "src/services/user";

import { useEffect, useState } from "react";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

export default function ManagerIdSelect() {
    const dispatch = useDispatch();
    const managerId = useSelector(selectManagerId);
    const [autocompleteValue, setAutocompleteValue] = useState("");
    useEffect(
        () => setAutocompleteValue(managerId?.toString() || ""),
        [managerId]
    );
    const { t } = useTranslation();
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
                    <TextField
                        {...params}
                        placeholder={
                            (t("Manager ID") as string) || "Manager ID"
                        }
                    />
                )}
            />
        </FormControl>
    );
}
