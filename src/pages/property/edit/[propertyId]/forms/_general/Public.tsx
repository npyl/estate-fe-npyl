import { Grid } from "@mui/material";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import Panel from "src/components/Panel";
import { RHFCheckbox } from "src/components/hook-form/RHFCheckbox";
import { TranslationType } from "src/types/translation";

const getFEATURES = (t: TranslationType) => [
    {
        label: t("Sea Front"),
        value: "features.seaFront",
    },
    {
        label: t("Luxurious"),
        value: "technicalFeatures.luxurious",
    },
    {
        label: t("Mountain View"),
        value: "features.mountainView",
    },
    {
        label: t("Golden Visa"),
        value: "details.goldenVisa",
    },
    {
        label: t("Neoclassical"),
        value: "construction.neoclassical",
    },
    {
        label: t("Student"),
        value: `suitableFor.student`,
    },
    {
        label: t("Investment"),
        value: "suitableFor.investment",
    },
];

const Public = () => {
    const { t } = useTranslation();

    const FEATURES = useMemo(() => getFEATURES(t), [t]);

    return (
        <Panel label={t("Public Features")}>
            <Grid container spacing={1}>
                {FEATURES.map(({ label, value }, i) => (
                    <Grid item key={i} xs={12} sm={6} md={4}>
                        <RHFCheckbox name={value} label={label} key={i} />
                    </Grid>
                ))}
            </Grid>
        </Panel>
    );
};

export default Public;
