import { Grid } from "@mui/material";
import * as React from "react";
import { useTranslation } from "react-i18next";
import Panel from "src/components/Panel";
import { RHFCheckbox } from "src/components/hook-form";

const SuitableForForLandSection: React.FC = () => {
    const { t } = useTranslation();

    return (
        <Panel label={t("Suitable For")}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <RHFCheckbox
                        name="suitableFor.agriculturalUse"
                        label={t("Agricultural Use")}
                    />
                </Grid>

                <Grid item xs={6}>
                    <RHFCheckbox
                        name="suitableFor.investment"
                        label={t("Investment")}
                    />
                </Grid>
            </Grid>
        </Panel>
    );
};

export default SuitableForForLandSection;
