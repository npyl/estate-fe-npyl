import { Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { RHFCheckbox } from "@/components/hook-form";
import DemandsButton from "./DemandsButton";

const CustomerTypeSelect = () => {
    const { t } = useTranslation();

    return (
        <Grid
            sx={{
                border: 1,
                borderColor: "divider",
                borderRadius: 1,
                p: 2,
                position: "relative",
            }}
            container
        >
            <Grid item xs={12} sm={6} md={3}>
                <RHFCheckbox name="seller" label={undefined} />
                <Typography variant="h6">{t("Seller")}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <RHFCheckbox name="lessor" label={undefined} />
                <Typography variant="h6">{t("Lessor")}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <RHFCheckbox name="leaser" label={undefined} />
                <Typography variant="h6">{t("Leaser")}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <RHFCheckbox name="buyer" label={undefined} />
                <Typography variant="h6">{t("Buyer")}</Typography>
            </Grid>

            <DemandsButton />
        </Grid>
    );
};
export default CustomerTypeSelect;
