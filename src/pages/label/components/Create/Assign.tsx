import {
    Autocomplete,
    Checkbox,
    FormControlLabel,
    TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAllCustomersQuery } from "src/services/customers";
import { useAllPropertiesQuery } from "src/services/properties";
import { useFormContext } from "react-hook-form";

const Assign = () => {
    const { t } = useTranslation();

    const { watch } = useFormContext();
    // TODO: rename this!
    const assigneeType = watch("resource");

    const [checked, setChecked] = useState(false);

    const [autocompleteError, setAutocompleteError] = useState("");

    const properties: string[] =
        useAllPropertiesQuery(undefined, {
            selectFromResult: ({ data }) => ({
                data: data
                    ?.filter((property) => property.code !== null)
                    .map((property) => {
                        return property.code;
                    }),
            }),
        }).data || [];

    const customers: string[] =
        useAllCustomersQuery(undefined, {
            selectFromResult: ({ data }) => ({
                data: data
                    ?.filter(
                        (customer) =>
                            customer.id &&
                            customer.firstName &&
                            customer.lastName
                    )
                    .map((customer) => {
                        return customer.firstName + " " + customer.lastName;
                    }),
            }),
        }).data || [];

    const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) =>
        setChecked(event.target.checked);

    return (
        <>
            <FormControlLabel
                control={<Checkbox checked={checked} onChange={handleCheck} />}
                label={t("Label assignment")}
            />

            {checked && (
                <Autocomplete
                    disablePortal
                    options={
                        assigneeType === "property" ? properties : customers
                    }
                    fullWidth
                    sx={{ marginBottom: 2 }}
                    renderInput={(params) => (
                        <TextField
                            error={!!autocompleteError}
                            helperText={autocompleteError}
                            {...params}
                        />
                    )}
                />
            )}
        </>
    );
};

export default Assign;
