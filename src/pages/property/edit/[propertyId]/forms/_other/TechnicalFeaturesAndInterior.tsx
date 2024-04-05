import { Grid } from "@mui/material";
import * as React from "react";
import { useTranslation } from "react-i18next";
import Panel from "src/components/Panel";
import { RHFCheckbox } from "src/components/hook-form";
import { TranslationType } from "src/types/translation";
import { useMemo } from "react";

const getFEATURES = (t: TranslationType) => [
    {
        label: t("Safety Door"),
        name: "technicalFeatures.safetyDoor",
    },
    {
        label: t("Alarm System"),
        name: "technicalFeatures.alarmSystem",
    },
    {
        label: t("Double Frontage"),
        name: "technicalFeatures.doubleFrontage",
    },
    {
        label: t("Satellite TV"),
        name: "technicalFeatures.satelliteTV",
    },
    {
        label: t("Reception"),
        name: "technicalFeatures.reception",
    },
    {
        label: t("Loading-Unloading Elevator"),
        name: "technicalFeatures.loadingUnloadingElevator",
    },

    {
        label: t("False Ceiling"),
        name: "technicalFeatures.falseCeiling",
    },
    {
        label: t("With Equipment"),
        name: "technicalFeatures.withEquipment",
    },
];

const TechnicalFeaturesAndInterior: React.FC = () => {
    const { t } = useTranslation();

    const FEATURES = useMemo(() => getFEATURES(t), [t]);

    return (
        <Panel label={t("Technical Features And Interior")}>
            <Grid container spacing={2}>
                {FEATURES.map(({ name, label }, i) => (
                    <Grid key={i} item xs={12} md={6}>
                        <RHFCheckbox name={name} label={label} />
                    </Grid>
                ))}
            </Grid>
        </Panel>
    );
};

export default TechnicalFeaturesAndInterior;
