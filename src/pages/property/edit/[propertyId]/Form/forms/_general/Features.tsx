import { Grid, GridProps } from "@mui/material";
import * as React from "react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import Panel from "src/components/Panel";
import { RHFCheckbox } from "src/components/hook-form";
import { TranslationType } from "src/types/translation";

interface ICheckboxItemProps extends GridProps {
    label: string;
    value: string;
    variant?: "features" | "technicalFeatures";
}

const CheckboxItem = ({
    value,
    label,
    variant = "features",
    ...props
}: ICheckboxItemProps) => {
    const name = useMemo(() => `${variant}.${value}`, [variant, value]);

    return (
        <Grid item xs={3} {...props}>
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
        label: t("Panoramic View"),
        value: "panoramicView",
    },
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
        label: t("Drilling"),
        value: "drilling",
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
        label: t("Barbeque"),
        value: "barbeque",
    },
    {
        label: t("Sea View"),
        value: "seaView",
    },
    {
        label: t("Mountain View"),
        value: "mountainView",
    },
    {
        label: t("Sea Front"),
        value: "seaFront",
    },
    {
        label: t("Smart Home"),
        value: "smartHome",
    },
    {
        label: t("Thermal Insulation"),
        value: "thermalInsulation",
    },
    {
        label: t("Jacuzzi"),
        value: "jacuzzi",
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
        label: t("Near Bus Route"),
        value: "nearBusRoute",
    },
    {
        label: t("Guestroom"),
        value: "guestroom",
    },
    {
        label: t("Office"),
        value: "office",
    },
    {
        label: t("Home Cinema"),
        value: "homeCinema",
    },
    {
        label: t("Combined Kitchen and Dining Area"),
        value: "combinedKitchenAndDiningArea",
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
        label: t("Well"),
        value: "well",
    },

    {
        label: t("Masonry Fence"),
        value: "masonryFence",
    },
    {
        label: t("Access for Disabled"),
        value: "accessForDisabled",
    },
    {
        label: t("Tents"),
        value: "tents",
    },
    {
        label: t("Heated Pool"),
        value: "heatedPool",
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
    {
        label: t("Indoor Pool"),
        value: "indoorPool",
    },
];

const FeaturesSection: React.FC<any> = (props) => {
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
export default FeaturesSection;
