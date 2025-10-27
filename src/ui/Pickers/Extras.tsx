import Select, { SelectChangeEvent, SelectProps } from "@/components/Select";
import { KeyValue } from "@/types/KeyValue";
import { TranslationType } from "@/types/translation";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import { FC, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

// ------------------------------------------------------------------

const getOption = (value?: string[]) => (o: KeyValue) => (
    <MenuItem key={o.key} value={o.key}>
        <Checkbox checked={value?.includes(o.key)} />
        {o.value}
    </MenuItem>
);

// ------------------------------------------------------------------

const getOPTIONS = (t: TranslationType): KeyValue[] => [
    {
        value: t(`Luxury homes`),
        key: "luxury",
    },
    {
        value: t(`Seafront`),
        key: "seaFront",
    },
    {
        value: t(`Mountain view`),
        key: "mountainView",
    },
    {
        value: t(`Golden visa`),
        key: "goldenVisa",
    },
    {
        value: t(`Historic Neoclassical`),
        key: "neoclassical",
    },
    {
        value: t(`Student`),
        key: "student",
    },
    {
        value: t(`Investment`),
        key: "investment",
    },
];

interface ExtrasPickerProps
    extends Omit<SelectProps<string[]>, "value" | "onChange"> {
    value: string[];
    onChange?: (v: string[]) => void;
}

const ExtrasPicker: FC<ExtrasPickerProps> = ({
    value = [],
    onChange: _onChange,
    sx,
    ...props
}) => {
    const { t } = useTranslation();

    const OPTIONS = useMemo(() => getOPTIONS(t), [t]);

    const onChange = useCallback(
        (e: SelectChangeEvent<string[]>) =>
            _onChange?.(e.target.value as string[]),
        [_onChange]
    );

    return (
        <Select
            multiple
            label={t("Extras")}
            value={value}
            onChange={onChange}
            sx={{ width: "180px", ...sx }}
            {...props}
        >
            {OPTIONS?.map(getOption(value))}
        </Select>
    );
};

export default ExtrasPicker;
