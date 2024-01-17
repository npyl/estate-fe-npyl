import { Grid } from "@mui/material";
import * as React from "react";
import { IGlobalProperty, IGlobalPropertyDetails } from "src/types/global";
import { useGlobals } from "src/hooks/useGlobals";
import { useTranslation } from "react-i18next";
import Panel from "src/components/Panel";
import { RHFCheckbox, Select } from "src/components/hook-form";

const HeatingAndEnergySection: React.FC = () => {
    const { t } = useTranslation();

    const data = useGlobals();
    const enums: IGlobalProperty = data?.property as IGlobalProperty;
    const details = enums?.details as IGlobalPropertyDetails;

    return (
        <Panel label={t("Heating and Energy")}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Select
                        label={t("Heating Type")}
                        name="heatingAndEnergy.heatingType"
                        options={details?.heatingType}
                    />
                </Grid>

                <Grid item xs={6}>
                    <Select
                        label={t("Energy Class")}
                        name="heatingAndEnergy.energyClass"
                        options={details?.energyClass}
                    />
                </Grid>

                <Grid item xs={6}>
                    <Select
                        label={t("Heating System")}
                        name="heatingAndEnergy.heatingSystem"
                        options={details?.heatingSystem}
                    />
                </Grid>

                <Grid item xs={6}>
                    <Select
                        label={t("Electricity Type")}
                        name="heatingAndEnergy.electricityType"
                        options={details?.electricityType}
                    />
                </Grid>

                <Grid item xs={3}>
                    <RHFCheckbox
                        name={"heatingAndEnergy.floorHeating"}
                        label={t("Floor Heating")}
                    />
                </Grid>

                <Grid item xs={3}>
                    <RHFCheckbox
                        name={"heatingAndEnergy.airConditioning"}
                        label={t("Air-Coditioning")}
                    />
                </Grid>

                <Grid item xs={3}>
                    <RHFCheckbox
                        name={"heatingAndEnergy.solarBoiler"}
                        label={t("Solar Boiler")}
                    />
                </Grid>

                <Grid item xs={3}>
                    <RHFCheckbox
                        name={"heatingAndEnergy.offPeakElectricity"}
                        label={t("Off Peak Electricity")}
                    />
                </Grid>
            </Grid>
        </Panel>
    );
};
export default HeatingAndEnergySection;
