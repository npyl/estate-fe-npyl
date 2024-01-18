import { Grid } from "@mui/material";
import * as React from "react";
import { IGlobalPropertyDetails } from "src/types/global";
import { useGlobals } from "src/hooks/useGlobals";
import { useTranslation } from "react-i18next";
import Panel from "src/components/Panel";
import { RHFCheckbox, RHFOnlyNumbers, Select } from "src/components/hook-form";
import { TranslationType } from "src/types/translation";
import { useMemo } from "react";
import { KeyValue } from "src/types/KeyValue";

const getFIELDS = (t: TranslationType, floorType: KeyValue[]) => [
    <RHFOnlyNumbers
        label={t("Display Window Length")}
        name="technicalFeatures.displayWindowsLength"
        adornment="m"
    />,

    <RHFOnlyNumbers
        fullWidth
        label={t("Entrances")}
        name="technicalFeatures.entrances"
    />,

    <Select
        fullWidth
        label={t("Floor Type")}
        name="technicalFeatures.floorType"
        options={floorType}
    />,
];

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
        label: t("Fireplace"),
        name: "technicalFeatures.fireplace",
    },
    {
        label: t("Luxurious"),
        name: "technicalFeatures.luxurious",
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
        label: t("Pets Allowed"),
        name: "technicalFeatures.petsAllowed",
    },
    {
        label: t("Electric Car Charging Facilities"),
        name: "technicalFeatures.electricCarChargingFacilities",
    },
    {
        label: t("Wiring"),
        name: "technicalFeatures.wiring",
    },
    {
        label: t("Loading-Unloading Elevator"),
        name: "technicalFeatures.loadingUnloadingElevator",
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
            floorType: details?.heatingType || [],
        }),
        [details]
    );
    return enums;
};

const TechnicalFeaturesAndInterior: React.FC = () => {
    const { t } = useTranslation();
    const { floorType } = useEnums();

    const FIELDS = useMemo(() => getFIELDS(t, floorType), [t, floorType]);
    const FEATURES = useMemo(() => getFEATURES(t), [t]);

    return (
        <Panel label={t("Technical Features And Interior")}>
            <Grid container spacing={2}>
                {FIELDS.map((f, i) => (
                    <Grid key={i} item xs={6}>
                        {f}
                    </Grid>
                ))}
                {FEATURES.map(({ name, label }, i) => (
                    <Grid key={i} item xs={6}>
                        <RHFCheckbox name={name} label={label} />
                    </Grid>
                ))}
            </Grid>
        </Panel>
    );
};

export default TechnicalFeaturesAndInterior;
