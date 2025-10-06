import RHFRadioGroup from "@/components/hook-form/RHFRadioGroup";
import { TranslationType } from "@/types/translation";
import { SxProps, Theme } from "@mui/material";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

const RadioGroupSx: SxProps<Theme> = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
};

interface IOption {
    label: string;
    value: string;
}

const getRadioOptions = (t: TranslationType): IOption[] => [
    { label: t("Property"), value: "property" },
    { label: t("Customer"), value: "customer" },
    { label: t("Document"), value: "document" },
    { label: t("Task"), value: "ticket" },
];

const Resource = () => {
    const { t } = useTranslation();
    const radioOptions = useMemo(() => getRadioOptions(t), [t]);
    return (
        <RHFRadioGroup
            name="resource"
            options={radioOptions}
            sx={RadioGroupSx}
        />
    );
};

export default Resource;
