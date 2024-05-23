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
                    firstName,
                    lastName,
                    id,
                })) || [],
        [owners]
    );

    const value = useMemo(() => {
        const o = ownerNames.find((i) => i.id == owner);
        return {
            firstName: o?.firstName || "",
            lastName: o?.lastName || "",
            id: owner,
        };
    }, [owner, ownerNames]);

    const handleChange = useCallback(
        (e: any, v: any | null) => setValue("ownerId", v?.id || ""),
        []
    );

    return (
        <MuiAutocomplete
            disablePortal
            options={ownerNames}
            value={value}
            getOptionLabel={(o) => `${o.firstName} ${o.lastName}`}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} label="Owner" />}
        />
    );
};

export default Autocomplete;
