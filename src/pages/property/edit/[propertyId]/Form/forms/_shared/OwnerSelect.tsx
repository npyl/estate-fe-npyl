import { Grid } from "@mui/material";
import Autocomplete from "../components/OwnerAutocomplete";
import CreateTooltip from "@/sections/Customer/CreateTooltip";
import { useCallback } from "react";
import { useFormContext } from "react-hook-form";

const OwnerSelect = () => {
    const { setValue } = useFormContext();

    const handleCreate = useCallback((id: number) => {
        console.log("id: ", id);
        setValue("ownerId", id, { shouldDirty: true });
    }, []);

    return (
        <Grid
            item
            xs={12}
            sm={6}
            width="100%"
            alignItems="center"
            // ...
            display="flex"
            flexDirection="row"
            gap={1.5}
        >
            <Autocomplete />
            <CreateTooltip onCreate={handleCreate} />
        </Grid>
    );
};

export default OwnerSelect;
