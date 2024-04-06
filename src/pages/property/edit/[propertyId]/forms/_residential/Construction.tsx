import { Grid, MenuItem } from "@mui/material";
import * as React from "react";
import { useTranslation } from "react-i18next";
import Panel from "src/components/Panel";
import {
    RHFCheckbox,
    RHFOnlyNumbers,
    RHFTextField,
} from "src/components/hook-form";

const ConstructionForResidentialSection: React.FC<any> = (props) => {
    const { t } = useTranslation();

    return (
        <Panel label={t("Construction")}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <RHFOnlyNumbers
                        fullWidth
                        label={t("Year of Construction")}
                        name="construction.yearOfConstruction"
                    />
                </Grid>
                <Grid item xs={6}>
                    <RHFOnlyNumbers
                        fullWidth
                        label={t("Year of Renovation")}
                        name="construction.yearOfRenovation"
                    />
                </Grid>
                <Grid item xs={6}>
                    <RHFTextField
                        fullWidth
                        select
                        label={t("Total Floor Number")}
                        name={"construction.totalFloorNumber"}
                    >
                        {[...Array(10)].map((_, index) => {
                            const value = String(index + 1);
                            return (
                                <MenuItem key={value} value={value}>
                                    {value}
                                </MenuItem>
                            );
                        })}
                    </RHFTextField>
                </Grid>
                <Grid item xs={6}>
                    <RHFOnlyNumbers
                        fullWidth
                        label={t("Pool Size")}
                        name={"construction.poolSize"}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <RHFCheckbox
                        name={"construction.underConstruction"}
                        label={t("Under Construction")}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <RHFCheckbox
                        name={"construction.renovated"}
                        label={t("Renovated")}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <RHFCheckbox
                        name={"construction.needsRenovation"}
                        label={t("Needs Renovation")}
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <RHFCheckbox
                        name={"construction.elevator"}
                        label={t("Elevator")}
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <RHFCheckbox
                        name={"construction.internalStairs"}
                        label={t("Internal Stairs")}
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <RHFCheckbox
                        name={"construction.newlyBuilt"}
                        label={t("Newly Build")}
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <RHFCheckbox
                        name={"construction.incomplete"}
                        label={t("Incomplete")}
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <RHFCheckbox
                        name={"construction.neoclassical"}
                        label={t("Neoclassical")}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4.1}>
                    <RHFCheckbox
                        name={"construction.preserved"}
                        label={t("Preserved")}
                    />
                </Grid>
            </Grid>
        </Panel>
    );
};
export default ConstructionForResidentialSection;
