import { Grid, MenuItem } from "@mui/material";
import * as React from "react";
import { IGlobalPropertyDetails } from "src/types/global";
import { useGlobals } from "src/hooks/useGlobals";
import { useTranslation } from "react-i18next";
import Panel from "src/components/Panel";
import { RHFCheckbox, RHFTextField } from "src/components/hook-form";

const HeatingAndEnergy: React.FC<any> = (props) => {
    const { t } = useTranslation();

    const data = useGlobals();
    const details = data?.property?.details as IGlobalPropertyDetails;

    return (
        <Panel label={t("Heating and Energy")}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <RHFTextField
                        fullWidth
                        select
                        label={t("Heating Type")}
                        name="heatingAndEnergy.heatingType"
                    >
                        {details?.heatingType?.map(({ key, value }) => (
                            <MenuItem key={key} value={key}>
                                {value}
                            </MenuItem>
                        ))}
                    </RHFTextField>
                </Grid>

                <Grid item xs={6}>
                    <RHFTextField
                        fullWidth
                        select
                        label={t("Energy Class")}
                        name="heatingAndEnergy.energyClass"
                    >
                        {details?.energyClass?.map(({ key, value }) => (
                            <MenuItem key={key} value={key}>
                                {value}
                            </MenuItem>
                        ))}
                    </RHFTextField>
                </Grid>

                <Grid item xs={6}>
                    <RHFTextField
                        fullWidth
                        select
                        label={t("Heating System")}
                        name="heatingAndEnergy.heatingSystem"
                    >
                        {details?.heatingSystem?.map(({ key, value }) => (
                            <MenuItem key={key} value={key}>
                                {value}
                            </MenuItem>
                        ))}
                    </RHFTextField>
                </Grid>

                <Grid item xs={6}>
                    <RHFTextField
                        fullWidth
                        select
                        label={t("Electricity Type")}
                        name="heatingAndEnergy.electricityType"
                    >
                        {details?.electricityType?.map(({ key, value }) => (
                            <MenuItem key={key} value={key}>
                                {value}
                            </MenuItem>
                        ))}
                    </RHFTextField>
                </Grid>

                <Grid item xs={3}>
                    <RHFCheckbox
                        name="heatingAndEnergy.floorHeating"
                        label={t("Floor Heating")}
                    />
                </Grid>

                <Grid item xs={3}>
                    <RHFCheckbox
                        name="heatingAndEnergy.airConditioning"
                        label={t("Air-Coditioning")}
                    />
                </Grid>
            </Grid>
        </Panel>
    );
};

export default HeatingAndEnergy;
