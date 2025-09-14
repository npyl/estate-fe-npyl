import { Grid } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { ResponsiveHeads } from "./Content";
import CustomTypography from "./Content/ResponsiveHeads/CustomTypography";
import { HeadProps } from "./Content/ResponsiveHeads";

const Head: FC<HeadProps> = (props) => {
    const { t } = useTranslation();
    return (
        <Grid container alignItems="center" spacing={1} p={1} py={2}>
            <Grid item xs={4} md={3}>
                <CustomTypography
                    label={t("Users")}
                    textAlign="left"
                    variant="h6"
                />
            </Grid>

            {/* ----- */}
            <ResponsiveHeads {...props} />
            {/* ----- */}

            <Grid item xs={4} md={2.8}>
                <CustomTypography label={t("Attribution")} textAlign="right" />
            </Grid>
        </Grid>
    );
};

export default Head;
