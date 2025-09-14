import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ResponsiveHeads } from "./Content";
import CustomTypography from "./Content/ResponsiveHeads/CustomTypography";

const Head = () => {
    const { t } = useTranslation();

    return (
        <Grid container alignItems="center" spacing={1} p={1} py={2}>
            <Grid item xs={4} md={3.2}>
                <CustomTypography
                    label={t("Users")}
                    textAlign="left"
                    variant="h6"
                />
            </Grid>

            {/* ----- */}
            <ResponsiveHeads />
            {/* ----- */}

            <Grid item xs={4} md={2.8}>
                <CustomTypography label={t("Attribution")} textAlign="right" />
            </Grid>
        </Grid>
    );
};

export default Head;
