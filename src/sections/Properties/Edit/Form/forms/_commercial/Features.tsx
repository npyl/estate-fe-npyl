import { Grid } from "@mui/material";
import * as React from "react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import Panel from "src/components/Panel";
import { TranslationType } from "src/types/translation";
import CheckboxItem from "../components/CheckboxItem";

interface Feature {
    value: string;
    label: string;
}

const getFEATURES = (t: TranslationType): Feature[] => [
    {
        label: t("Corner"),
        value: "corner",
    },
    {
        label: t("Facade"),
        value: "facade",
    },
    {
        label: t("Organized Garden"),
        value: "organizedGarden",
    },

    {
        label: t("Adapting to the Ground"),
        value: "adaptingToTheGround",
    },
    {
        label: t("Pool"),
        value: "pool",
    },
    {
        label: t("Internet"),
        value: "internet",
    },
    {
        label: t("Walkable Distance to Beach"),
        value: "walkableDistanceToBeach",
    },
    {
        label: t("Quiet Area"),
        value: "quietArea",
    },
    {
        label: t("View"),
        value: "view",
    },
    {
        label: t("Sound Insulation"),
        value: "soundInsulation",
    },
    {
        label: t("Veranda"),
        value: "veranda",
    },
    {
        label: t("Access for Disabled"),
        value: "accessForDisabled",
    },
    {
        label: t("Has 24 Hours Security"),
        value: "has24HoursSecurity",
    },
    {
        label: t("CCTV"),
        value: "cctv",
    },
    {
        label: t("Fire Detector"),
        value: "fireDetector",
    },
    {
        label: t("Independent Heating Per Room"),
        value: "independentHeatingPerRoom",
    },
];

const Features: React.FC = () => {
    const { t } = useTranslation();

    const FEATURES = useMemo(() => getFEATURES(t), [t]);

    return (
        <Panel label={t("Features")}>
            <Grid container spacing={2}>
                {FEATURES.map(({ label, value }, i) => (
                    <CheckboxItem
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        key={i}
                        label={label}
                        value={value}
                    />
                ))}
            </Grid>
        </Panel>
    );
};

export default Features;
