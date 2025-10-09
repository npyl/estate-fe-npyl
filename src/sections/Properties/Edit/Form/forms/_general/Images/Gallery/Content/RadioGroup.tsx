import { RHFRadioGroup } from "@/components/hook-form";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { TranslationType } from "@/types/translation";

const getVISIBILITY_OPTIONS = (t: TranslationType) => [
    { label: t("Public"), value: false },
    { label: t("Private"), value: true },
];

const RadioGroup = () => {
    const { t } = useTranslation();
    const VISIBILITY_OPTIONS = useMemo(() => getVISIBILITY_OPTIONS(t), [t]);
    return <RHFRadioGroup name="hidden" options={VISIBILITY_OPTIONS} />;
};

export default RadioGroup;
