import { Grid } from "@mui/material";
import * as React from "react";
import { IGlobalPropertyDetails } from "src/types/global";
import { useGlobals } from "src/hooks/useGlobals";
import { useTranslation } from "react-i18next";
import Panel from "src/components/Panel";
import { RHFCheckbox, Select } from "src/components/hook-form";
import { useMemo } from "react";

const useEnums = () => {
    const data = useGlobals();
    const details = useMemo(
        () => data?.property?.details as IGlobalPropertyDetails,
        [data]
    );
    const enums = useMemo(
        () => ({
            heatingType: details?.heatingType || [],
            energyClass: details?.energyClass || [],
            heatingSystem: details?.heatingSystem || [],
            electricityType: details?.electricityType || [],
        }),
        [details]
    );
    return enums;
};

const HeatingAndEnergy: React.FC = () => {
    const { t } = useTranslation();
    const { heatingType, energyClass, heatingSystem, electricityType } =
        useEnums();

    return (
        <Panel label={t("Heating and Energy")}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Select
                        fullWidth
                        label={t("Heating Type")}
                        name="heatingAndEnergy.heatingType"
                        options={heatingType}
                    />
                </Grid>

                <Grid item xs={6}>
                    <Select
                        fullWidth
                        label={t("Energy Class")}
                        name="heatingAndEnergy.energyClass"
                        options={energyClass}
                    />
                </Grid>

                <Grid item xs={6}>
                    <Select
                        fullWidth
                        label={t("Heating System")}
                        name="heatingAndEnergy.heatingSystem"
                        options={heatingSystem}
                    />
                </Grid>

                <Grid item xs={6}>
                    <Select
                        fullWidth
                        label={t("Electricity Type")}
                        name="heatingAndEnergy.electricityType"
                        options={electricityType}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <RHFCheckbox
                        name="heatingAndEnergy.floorHeating"
                        label={t("Floor Heating")}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
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
