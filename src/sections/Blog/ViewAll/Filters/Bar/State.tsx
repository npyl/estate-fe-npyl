import { useFiltersContext } from "../Context";
import { useTranslation } from "react-i18next";
import { useCallback, useMemo } from "react";
import Select, { SelectChangeEvent } from "@/components/Select";
import { NOT_SELECTED_VALUE } from "@/constants/select";
import MenuItem from "@mui/material/MenuItem";
import { TranslationType } from "@/types/translation";

interface IOption {
    value: typeof NOT_SELECTED_VALUE | boolean;
    label: string;
}

const getOption = ({ value, label }: IOption, index: number) => (
    <MenuItem key={index} value={value as any}>
        {label}
    </MenuItem>
);

const getOPTIONS = (t: TranslationType): IOption[] => [
    {
        value: NOT_SELECTED_VALUE,
        label: t("Not selected"),
    },
    { value: true, label: t("Published") },
    { value: false, label: t("Unpublished") },
];

const State = () => {
    const { t } = useTranslation();
    const OPTIONS = useMemo(() => getOPTIONS(t), [t]);

    const {
        filters: { published: _published },
        setPublished,
    } = useFiltersContext();

    const published = _published ?? NOT_SELECTED_VALUE;

    const onChange = useCallback((e: SelectChangeEvent<boolean>) => {
        const v = e.target.value;
        if (v === NOT_SELECTED_VALUE) setPublished(undefined);
        else setPublished(e.target.value as unknown as boolean);
    }, []);

    return (
        <Select<boolean>
            label={t("State")}
            value={published}
            formControlProps={{ sx: { minWidth: "130px" } }}
            onChange={onChange}
        >
            {OPTIONS.map(getOption)}
        </Select>
    );
};

export default State;
