import { Grid } from "@mui/material";
import * as React from "react";
import { useTranslation } from "react-i18next";
import Panel from "src/components/Panel";
import { RHFOnlyNumbers } from "src/components/hook-form";

const FloorAreasInput = () => {
    const { t } = useTranslation();

    return (
        <Grid container direction="row">
            <Grid item xs={2}>
                <RHFOnlyNumbers
                    label={t("Ground Floor")}
                    name="areas.groundFloor"
                />
            </Grid>
            <Grid item xs={2}>
                <RHFOnlyNumbers label={t("1st")} name="areas.first" />
            </Grid>
            <Grid item xs={2}>
                <RHFOnlyNumbers label={t("2nd")} name="areas.second" />
            </Grid>
            <Grid item xs={2}>
                <RHFOnlyNumbers label={t("3rd")} name="areas.third" />
            </Grid>
            <Grid item xs={2}>
                <RHFOnlyNumbers label={t("4th")} name="areas.fourth" />
            </Grid>
            <Grid item xs={2}>
                <RHFOnlyNumbers label={t("5th")} name="areas.fifth" />
            </Grid>
        </Grid>
    );
};

const AreasSection: React.FC<any> = () => {
    const { t } = useTranslation();

    return (
        <Panel label={t("Areas")}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <FloorAreasInput />
                </Grid>

                <Grid item xs={6}>
                    <RHFOnlyNumbers
                        fullWidth
                        label={t("Covered")}
                        name="areas.covered"
                        adornment="m²"
                    />
                </Grid>
                <Grid item xs={6}>
                    <RHFOnlyNumbers
                        fullWidth
                        label={t("Basement")}
                        name="areas.basement"
                        adornment="m²"
                    />
                </Grid>
                <Grid item xs={6}>
                    <RHFOnlyNumbers
                        fullWidth
                        label={t("Attic")}
                        name="areas.attic"
                        adornment="m²"
                    />
                </Grid>
                <Grid item xs={6}>
                    <RHFOnlyNumbers
                        fullWidth
                        label={t("Garden")}
                        name="areas.garden"
                        adornment="m²"
                    />
                </Grid>
                <Grid item xs={6}>
                    <RHFOnlyNumbers
                        fullWidth
                        label={t("Balconies")}
                        name="areas.balconies"
                        adornment="m²"
                    />
                </Grid>
                <Grid item xs={6}>
                    <RHFOnlyNumbers
                        fullWidth
                        label={t("Storeroom")}
                        name="areas.storeroom"
                        adornment="m²"
                    />
                </Grid>
            </Grid>
        </Panel>
    );
};
export default AreasSection;
