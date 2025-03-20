import { Grid } from "@mui/material";
import RHFCustomer from "@/sections/_Autocompletes/RHFCustomer";
import CreateTooltip from "@/sections/Customer/CreateTooltip";
import { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

const OwnerSelect = () => {
    const { t } = useTranslation();

    const { setValue } = useFormContext();

    const handleCreate = useCallback((id: number) => {
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
            <RHFCustomer fullWidth label={t("Owner")} name="ownerId" />
            <CreateTooltip onCreate={handleCreate} />
        </Grid>
    );
};

export default OwnerSelect;
