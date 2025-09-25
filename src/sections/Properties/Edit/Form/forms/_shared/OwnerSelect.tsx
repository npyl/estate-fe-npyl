import { Grid } from "@mui/material";
import RHFCustomer from "@/ui/Autocompletes/RHFCustomer";
import PPCreateTooltip from "@/sections/Customer/CreateTooltip";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

// ---------------------------------------------------------------

const RHFCreateTooltip = () => {
    const { control } = useFormContext();
    return (
        <Controller
            name="ownerId"
            control={control}
            render={({ field: { onChange } }) => (
                <PPCreateTooltip onCreate={onChange} />
            )}
        />
    );
};

// ---------------------------------------------------------------

const OwnerSelect = () => {
    const { t } = useTranslation();

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
            <RHFCustomer fullWidth label={t<string>("Owner")} name="ownerId" />
            <RHFCreateTooltip />
        </Grid>
    );
};

export default OwnerSelect;
