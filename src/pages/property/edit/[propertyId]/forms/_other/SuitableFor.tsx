import { Grid } from "@mui/material";
import * as React from "react";
import { useTranslation } from "react-i18next";
import Panel from "src/components/Panel";
import { RHFCheckbox } from "src/components/hook-form";

const SuitableFor: React.FC<any> = (props) => {
    const { t } = useTranslation();

    return (
        <Panel label={t("Suitable For")}>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <RHFCheckbox
                        name="suitableFor.investment"
                        label={t("Investment")}
                    />
                </Grid>
            </Grid>
        </Panel>
    );
};

export default SuitableFor;
