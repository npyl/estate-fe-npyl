import {
    TextField,
    Autocomplete as MuiAutocomplete,
    InputAdornment,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { useAllCustomersQuery } from "src/services/customers";
import { useCallback, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";

const Autocomplete = () => {
    const { watch, setValue } = useFormContext();

    const { data: owners } = useAllCustomersQuery();
    const owner = watch("ownerId");

    const [openModal, setOpenModal] = useState(false);

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
            sx={{ width: "100%" }}
            renderInput={(params) => (
                <TextField {...params} label="Owner" sx={{ width: "100%" }} />
            )}
        />
    );
};

export default Autocomplete;
