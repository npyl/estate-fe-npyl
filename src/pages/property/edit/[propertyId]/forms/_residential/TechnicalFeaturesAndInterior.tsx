import { Grid } from "@mui/material";
import * as React from "react";
import { useSelector } from "react-redux";
import { selectSatelliteTV } from "src/slices/property";
import { IGlobalProperty, IGlobalPropertyDetails } from "src/types/global";
import { useGlobals } from "src/hooks/useGlobals";
import { useTranslation } from "react-i18next";
import Panel from "src/components/Panel";
import { RHFCheckbox, Select } from "src/components/hook-form";
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
        label: t("Painted"),
        name: "technicalFeatures.painted",
    },
    {
        label: t("Bright"),
        name: "technicalFeatures.bright",
    },
    {
        label: t("Window Screens"),
        name: "technicalFeatures.windowScreens",
    },
    {
        label: t("Double Frontage"),
        name: "technicalFeatures.doubleFrontage",
    },
    {
        label: t("Luxurious"),
        name: "technicalFeatures.luxurious",
    },
    {
        label: t("Fireplace"),
        name: "technicalFeatures.fireplace",
    },
    {
        label: t("Reception"),
        name: "technicalFeatures.reception",
    },
    {
        label: t("Pets Allowed"),
        name: "technicalFeatures.petsAllowed",
    },
    {
        label: t("Electric Car Charging Facilities"),
        name: "technicalFeatures.electricCarChargingFacilities",
    },

    {
        label: t("Satellite-TV"),
        name: "technicalFeatures.satelliteTV",
    },
];

const TechnicalFeaturesAndInteriorForResidentialSection: React.FC = () => {
    const { t } = useTranslation();

    const data = useGlobals();
    const enums: IGlobalProperty = data?.property as IGlobalProperty;
    const details = enums?.details as IGlobalPropertyDetails;

    const FEATURES = useMemo(() => getFEATURES(t), [t]);

    return (
        <Panel label={t("Technical Features And Interior")}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Select
                        label={t("Furnished")}
                        name="technicalFeatures.furnished"
                        options={details?.furnished}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Select
                        label={t("Frame Type")}
                        name="technicalFeatures.frameType"
                        options={details?.frameType}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Select
                        label={t("Pane Glass Type")}
                        name="technicalFeatures.paneGlassType"
                        options={details?.panelGlassType}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Select
                        label={t("Floor Type")}
                        name="technicalFeatures.floorType"
                        options={details?.floorType}
                    />
                </Grid>

                {FEATURES.map(({ name, label }, i) => (
                    <Grid key={i} item xs={6}>
                        <RHFCheckbox name={name} label={label} />
                    </Grid>
                ))}
            </Grid>
        </Panel>
    );
};

export default TechnicalFeaturesAndInteriorForResidentialSection;
