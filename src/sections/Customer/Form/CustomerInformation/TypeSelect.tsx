import { Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { RHFCheckbox } from "@/components/hook-form";
import DemandsButton from "./DemandsButton";
import { BUYER_CHECKBOX_ID } from "./constants";

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
                <RHFCheckbox name="seller" />
                <Typography variant="h6">{t("Seller")}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <RHFCheckbox name="lessor" />
                <Typography variant="h6">{t("Lessor")}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <RHFCheckbox name="leaser" />
                <Typography variant="h6">{t("Leaser")}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <RHFCheckbox data-testid={BUYER_CHECKBOX_ID} name="buyer" />
                <Typography variant="h6">{t("Buyer")}</Typography>
            </Grid>

            <DemandsButton />
        </Grid>
    );
};
export default CustomerTypeSelect;
