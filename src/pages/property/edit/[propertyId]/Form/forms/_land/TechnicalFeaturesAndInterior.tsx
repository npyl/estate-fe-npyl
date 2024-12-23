import { Grid } from "@mui/material";
import * as React from "react";
import { useTranslation } from "react-i18next";
import Panel from "src/components/Panel";
import { RHFOnlyNumbers, Select } from "src/components/hook-form";
import { useGlobals } from "src/hooks/useGlobals";

const TechnicalFeaturesAndInteriorForLandSection: React.FC<any> = () => {
    const { t } = useTranslation();

    const globals = useGlobals();
    const inclinationEnum = globals?.property?.details?.inclination || [];

    return (
        <Panel label={t("Technical Features And Interior")}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <RHFOnlyNumbers
                        fullWidth
                        acceptsDecimal
                        label={t("Floor To Area Ratio")}
                        name={"technicalFeatures.floorToAreaRatio"}
                    />
                </Grid>
                <Grid item xs={6}>
                    <RHFOnlyNumbers
                        fullWidth
                        label={t("Coverage Factor")}
                        name={"technicalFeatures.coverageFactor"}
                    />
                </Grid>
                <Grid item xs={6}>
                    <RHFOnlyNumbers
                        fullWidth
                        label={t("Facade Length")}
                        name={"technicalFeatures.facadeLength"}
                        adornment="m"
                    />
                </Grid>
                <Grid item xs={6}>
                    <Select
                        label={t("Inclination")}
                        name="technicalFeatures.inclination"
                        options={inclinationEnum}
                    />
                </Grid>
            </Grid>
        </Panel>
    );
};

export default TechnicalFeaturesAndInteriorForLandSection;
