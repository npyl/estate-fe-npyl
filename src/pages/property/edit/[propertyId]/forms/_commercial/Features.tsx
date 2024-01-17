import { Grid } from "@mui/material";
import * as React from "react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import Panel from "src/components/Panel";
import { RHFCheckbox } from "src/components/hook-form";
import { TranslationType } from "src/types/translation";

interface ICheckboxItemProps {
    label: string;
    value: string;
    variant?: "features" | "technicalFeatures";
}

const CheckboxItem = ({
    value,
    label,
    variant = "features",
}: ICheckboxItemProps) => {
    const name = useMemo(() => `${variant}.${value}`, [variant, value]);

    return (
        <Grid item xs={3}>
            <RHFCheckbox name={name} label={label} />
        </Grid>
    );
};

interface Feature {
    value: string;
    label: string;
    variant?: "features" | "technicalFeatures";
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

const Features: React.FC<any> = (props) => {
    const { t } = useTranslation();

    const FEATURES = useMemo(() => getFEATURES(t), [t]);

    return (
        <Panel label={t("Features")}>
            <Grid container spacing={2}>
                {FEATURES.map(({ label, value }, i) => (
                    <CheckboxItem key={i} label={label} value={value} />
                ))}
            </Grid>
        </Panel>
    );
};
export default Features;
