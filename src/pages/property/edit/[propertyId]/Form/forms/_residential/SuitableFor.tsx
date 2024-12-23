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
                <Grid item xs={12} sm={6} md={4}>
                    <RHFCheckbox
                        name="suitableFor.renovation"
                        label={t("Renovation")}
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <RHFCheckbox
                        name="suitableFor.investment"
                        label={t("Investment")}
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <RHFCheckbox
                        name="suitableFor.doctorsOffice"
                        label={t("Doctor's Office")}
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <RHFCheckbox
                        name="suitableFor.cottage"
                        label={t("Cottage")}
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <RHFCheckbox
                        name="suitableFor.touristRental"
                        label={t("Tourist Rental")}
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <RHFCheckbox
                        name="suitableFor.professionalUse"
                        label={t("Professional use")}
                    />
                </Grid>
            </Grid>
        </Panel>
    );
};

export default SuitableFor;
