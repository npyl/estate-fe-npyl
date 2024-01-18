import { TextField, Autocomplete as MuiAutocomplete } from "@mui/material";
import { useAllCustomersQuery } from "src/services/customers";
import { useCallback, useMemo } from "react";
import { useFormContext } from "react-hook-form";

const Autocomplete = () => {
    const { watch, setValue } = useFormContext();
    const { data: owners } = useAllCustomersQuery();
    const owner = watch("ownerId");

    const ownerNames = useMemo(
        () =>
            owners
                ?.filter(({ seller, lessor }) => seller || lessor)
                .map(({ firstName, lastName, id }) => ({
                    label: `${firstName} ${lastName}`,
                    value: id,
                })) || [],
        [owners]
    );

    const handleChange = useCallback(
        (e: any, v: any | null) => setValue("ownerId", v?.value || ""),
        []
    );

    return (
        <MuiAutocomplete
            disablePortal
            options={ownerNames}
            value={{
                label: ownerNames.find((i) => i.value == owner)?.label ?? "",
                value: owner,
            }}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} label="Owner" />}
        />
    );
};

export default Autocomplete;
