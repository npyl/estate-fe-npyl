import { Grid } from "@mui/material";
import * as React from "react";
import { IGlobalPropertyDetails } from "src/types/global";
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

const useEnums = () => {
    const data = useGlobals();
    const details = useMemo(
        () => data?.property?.details as IGlobalPropertyDetails,
        [data]
    );
    const enums = useMemo(
        () => ({
            furnished: details?.furnished || [],
            frameType: details?.frameType || [],
            panelGlassType: details?.panelGlassType || [],
            floorType: details?.floorType || [],
        }),
        [details]
    );
    return enums;
};

const TechnicalFeaturesAndInteriorForResidentialSection: React.FC = () => {
    const { t } = useTranslation();

    const { furnished, frameType, panelGlassType, floorType } = useEnums();

    const FEATURES = useMemo(() => getFEATURES(t), [t]);

    return (
        <Panel label={t("Technical Features And Interior")}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Select
                        label={t("Furnished")}
                        name="technicalFeatures.furnished"
                        options={furnished}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Select
                        label={t("Frame Type")}
                        name="technicalFeatures.frameType"
                        options={frameType}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Select
                        label={t("Pane Glass Type")}
                        name="technicalFeatures.paneGlassType"
                        options={panelGlassType}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Select
                        label={t("Floor Type")}
                        name="technicalFeatures.floorType"
                        options={floorType}
                    />
                </Grid>

                {FEATURES.map(({ name, label }, i) => (
                    <Grid key={i} item xs={12} sm={6}>
                        <RHFCheckbox name={name} label={label} />
                    </Grid>
                ))}
            </Grid>
        </Panel>
    );
};

export default TechnicalFeaturesAndInteriorForResidentialSection;
