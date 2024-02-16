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
            {FEATURES.map(({ label, value }, i) => (
                <RHFCheckbox name={value} label={label} key={i} />
            ))}
        </Panel>
    );
};

export default Public;
