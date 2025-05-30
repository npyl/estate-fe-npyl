import RHFTextField from "@/components/hook-form/RHFTextField";
// import RHFCustomerMultiple from "@/ui/Autocompletes/RHFCustomerMultiple";
import Grid from "@mui/material/Unstable_Grid2";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface ContentProps {
    createAssign?: boolean; // true when opened from inside customer for create-assign
}

const Content: FC<ContentProps> = ({ createAssign }) => {
    const { t } = useTranslation();

    return (
        <Grid container height={1} spacing={1}>
            <Grid xs={12} sm={6}>
                <RHFTextField name="name" label={t("Name")} />
                <RHFTextField name="email" label={t("Email")} />
            </Grid>
            <Grid xs={12} sm={6} display="flex" flexDirection="column" gap={1}>
                <RHFTextField name="phone" label={t("Phone")} />
                <RHFTextField name="gemh" label={t("GEMH")} />
                {/* {createAssign ? null : <RHFCustomerMultiple name="customers" />} */}
            </Grid>
        </Grid>
    );
};

export default Content;
