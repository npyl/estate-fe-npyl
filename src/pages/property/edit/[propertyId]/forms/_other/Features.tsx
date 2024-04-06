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
        label: t("Facade"),
        value: "facade",
    },
    {
        label: t("View"),
        value: "view",
    },
    {
        label: t("Veranda"),
        value: "veranda",
    },
    {
        label: t("Panoramic View"),
        value: "panoramicView",
    },
    {
        label: t("Loading Dock"),
        value: "loadingDock",
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
